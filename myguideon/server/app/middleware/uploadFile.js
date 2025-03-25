/**
 * @file uploadFile.js
 * @description   Middleware pour l'upload de fichiers (images et vidéos)
 * @module  Middleware uploadFile 
 * @author Sylvain
 * @email poteaux.sylvain@gmail.com
 * @website https://www.studio-purple.com
 * @version 0.0.1
 * @created 2025-03-10
 * 
 */
const multer = require('multer');
const path = require('node:path');
const fs = require('node:fs');

// Middleware for uploading files (images and videos)
const uploadFile = () => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Determine if the file is an image or a video
      const isVideo = file.mimetype.startsWith('video/');
      const uploadDir = isVideo 
        ? path.join(__dirname, '../../public/assets/video/')
        : path.join(__dirname, '../../public/assets/img/');

      // Create the directory if it doesn't exist
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      // Generate a unique filename using timestamp and random number
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    }
  });

  // Allowed file types for images and videos
  const allowedTypes = {
    image: ['image/jpeg', 'image/png', 'image/webp'],
    video: ['video/mp4', 'video/mov', 'video/avi', 'video/mkv']
  };

  return multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // Max 50MB (additional validation per file type below)
    fileFilter: (req, file, cb) => {
      const isImage = allowedTypes.image.includes(file.mimetype);
      const isVideo = allowedTypes.video.includes(file.mimetype);

      // Reject if the file is neither an image nor a video
      if (!isImage && !isVideo) {
        return cb(new Error('Invalid file format. Only images and videos are allowed.'));
      }

      // Additional size validation: max 5MB for images, 50MB for videos
      if (isImage && file.size > 5 * 1024 * 1024) {
        return cb(new Error('Images must not exceed 5MB.'));
      }
      if (isVideo && file.size > 50 * 1024 * 1024) {
        return cb(new Error('Videos must not exceed 50MB.'));
      }

      cb(null, true);
    }
  });
};

module.exports = uploadFile;
