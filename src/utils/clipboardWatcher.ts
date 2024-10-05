import clipboardy from 'clipboardy';
import Jimp from 'jimp';
import { performOCR } from '../service/ocrService';
import { processQuestion } from '../service/questionService';

let previousImage = '';

async function handleClipboardImage(image: Buffer): Promise<void> {
    try {
        const jimpImage = await Jimp.read(image);
        const imagePath = 'clipboard_image.png';
        await jimpImage.writeAsync(imagePath);
        const text = await performOCR(imagePath);
        if (text) {
            await processQuestion(text);
        }
    } catch (error) {
        console.error('Error processing clipboard image:', error);
    }
}

export async function watchClipboard(): Promise<void> {
    setInterval(async () => {
        try {
            const clipboardImage = await clipboardy.readImage();
            if (clipboardImage && clipboardImage !== previousImage) {
                previousImage = clipboardImage;
                await handleClipboardImage(Buffer.from(clipboardImage, 'base64'));
            }
        } catch (error) {
            console.error('Error reading clipboard image:', error);
        }
    }, 1000);
}
