import fs from 'fs';
import path from 'path';

export type Images = {
    src: string,
    alt: string
}

export const getPublicImages = (imagePath: string) => {
    const dir = path.join(process.cwd(), "public", imagePath);
    const images: Images[] = [];
    console.log(dir)
    fs.readdirSync(dir)
        .sort((a, b) => a.localeCompare(b))
        .forEach((image) => {
            if (/\.(jpg|jpeg|png|gif|webp|svg)$/i.test(image)) {

                let temImage = {
                    src: (`/${imagePath}/${image}`),
                    alt: path.parse(image).name

                }
                images.push(temImage);

            }
        });
    return images
}