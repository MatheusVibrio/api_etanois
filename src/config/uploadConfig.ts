import multer from 'multer';
import path from 'path';

// Configuração de armazenamento para o multer
const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'uploads'),
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

export default upload;

