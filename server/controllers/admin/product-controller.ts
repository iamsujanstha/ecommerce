import { Request, Response, response } from "express";
import { imageUploadUtils } from "../../config/cloudinary";

export const imageUpload = async (req: Request, res: Response) => {
  console.log("Uploaded File:", req.file);

  try {
    // Ensure req.file exists and has the required properties
    if (!req.file || !req.file.buffer || !req.file.mimetype) {
      res.status(400).json({
        success: false,
        message: "No file uploaded or invalid file format.",
      });
      return;
    }

    // Convert buffer to base64 string
    const b64 = Buffer.from(req?.file?.buffer).toString('base64');
    const url = `data:${req.file?.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await imageUploadUtils(url);

    // Respond with success if upload is successful
    res.json({
      success: true,
      message: "Image uploaded successfully",
      data: result,
    });
    console.log(result)

  } catch (error) {

    res.json({
      success: false,
      message: 'Error occured'
    })
  }
}