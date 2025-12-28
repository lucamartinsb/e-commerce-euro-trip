import multer from 'multer';
import path from 'path';

// Define o destino onde os ficheiros serão guardados:
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Garante que a pasta 'uploads' existe na raiz do backend:
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Define um nome de ficheiro único (nome original + timestamp + extensão):
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Middleware Multer configurado para aceitar apenas 1 imagem com o nome 'image':
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 4000 * 3000 } // Limite de 5MB, 12MP.
});

export const uploadProductImage = upload.single('image');