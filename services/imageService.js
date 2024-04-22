import multer from "multer";
import Jimp from "jimp";
import path from "path";
import * as fse from "fs-extra";
import fs from "fs";
import { v4 } from "uuid";
import HttpError from "../helpers/HttpError.js";

export class ImageService {
  static initUploadImageMiddleware(fieldName) {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, cbk) => {
      if (file.mimetype.startsWith("image/")) {
        cbk(null, true);
      } else {
        cbk(new HttpError(400, "Please, upload images only.."), false);
      }
    };

    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(fieldName);
  }

  static async saveImage(file, options, ...pathSegments) {
    if (
      file.size >
      (options?.maxFileSize
        ? options.maxFileSize * 1024 * 1024
        : 1 * 1024 * 1024)
    ) {
      throw new HttpError(400, "File is too large..");
    }

    const fileName = `${v4()}.jpeg`;
    const fullFilePath = path.join(
      process.cwd(),
      "public/avatars",
      fileName
    );
    const originalFileName = file.originalname;
    const tmpFilePath = path.join(process.cwd(), "tmp", originalFileName);
    await fs.promises.writeFile(tmpFilePath, file.buffer);
    const image = await Jimp.read(tmpFilePath);
    await image
      .cover(options?.width || 250, options?.height || 250)
      .quality(90)
      .writeAsync(fullFilePath);
    await fse.remove(tmpFilePath);


    // await fs.promises.writeFile(fullFilePath, file.buffer);

    return path.join(...pathSegments, fileName);
  }
}
