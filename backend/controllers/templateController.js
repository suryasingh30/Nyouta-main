import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import ejs from 'ejs';

const __dirname = dirname(fileURLToPath(import.meta.url));


export const getAllTemplates = async (req, res) => {
    try {
        const templatesDir = path.join(__dirname, '../uploads/templates'); // Path to templates
        const files = fs.readdirSync(templatesDir); // Read all files in the directory
        const imagesDir = path.join(__dirname, '../uploads/images'); // Path to images
        const images = fs.readdirSync(imagesDir);
        // console.log(images); // Read all images in the directory
        // Filter only .ejs files
        const ejsFiles = files.filter(file => path.extname(file) === '.ejs');
        // console.log(ejsFiles);
        // Render each EJS file with sample data
        const templates = ejsFiles.map(file => {
            const filePath = path.join(templatesDir, file);
            const content = fs.readFileSync(filePath, 'utf-8'); // Read the file content

            try {
                // Render the EJS template with data
                const renderedContent = ejs.render(content, {
                    home: null,
                    about: null,
                    ourStory: null,
                    socialLinks: null,
                    tags: null,
                    eventInfo: null,
                    gallery: null
                }); // Enable debug mode

                const id = path.basename(file, '.ejs'); // Extract ID from file name
                const image = images.find((img) => img.includes(id));
                // console.log(id, image);
                return { id, content: renderedContent, image }; // Send rendered HTML to frontend
            } catch (error) {
                // console.error('Error rendering EJS template:', error.message); // Log the error message
                throw error; // Rethrow the error for further handling
            }
        });

        res.status(200).json({ message: 'Templates fetched successfully', templates });
    } catch (error) {
        // console.log(error)
        res.status(500).json({ message: error.message });
    }
};


export const getTemplateById = async (req, res) => {
    try {
        const { id } = req.params;
        const templatesDir = path.join(__dirname, '../uploads/templates'); // Adjust path as needed
        const filePath = path.join(templatesDir, `${id}.ejs`);
        const content = fs.readFileSync(filePath, 'utf-8'); // Read the file content
        res.status(200).json({ message: 'Template fetched successfully', content });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
