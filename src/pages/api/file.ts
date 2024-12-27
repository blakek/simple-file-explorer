import { fileTypes } from "lib/mime";
import { resolvePath } from "lib/server-utils";
import { NextApiRequest, NextApiResponse } from "next";
import fs, { Stats } from "node:fs";
import path from "node:path";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (typeof req.query.path !== "string") {
    return res.status(400).json({ error: "Invalid path" });
  }

  const filePath = resolvePath(req.query.path);

  let fileStats: Stats | undefined;

  try {
    fileStats = await fs.promises.stat(filePath);
  } catch (_) {
    return res.status(404).json({ error: "File not found" });
  }

  const extension = path.extname(filePath).toLowerCase().slice(1);
  const mimeType = fileTypes[extension]?.mimeType ?? "application/octet-stream";
  res.setHeader("Content-Type", mimeType);

  let fileStream: NodeJS.ReadableStream;

  if (req.headers.range) {
    const rangeParts = req.headers.range.split("=")[1].split("-");
    const start = parseInt(rangeParts[0]);
    const end = parseInt(rangeParts[1]) || fileStats.size - 1;

    fileStream = fs.createReadStream(filePath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileStats.size}`,
      "Accept-Ranges": "bytes",
      "Content-Length": end - start + 1,
    });
  } else {
    fileStream = fs.createReadStream(filePath);

    res.writeHead(200, {
      "Accept-Ranges": "bytes",
      "Content-Length": fileStats.size,
    });
  }

  fileStream.pipe(res);
};

export const config = {
  api: {
    responseLimit: false,
  },
};
