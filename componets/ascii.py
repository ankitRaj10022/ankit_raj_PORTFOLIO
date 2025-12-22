from PIL import Image

ASCII_CHARS = "@%#*+=-:. "

def resize(image, new_width=80):
    width, height = image.size
    ratio = height / width
    new_height = int(new_width * ratio * 0.55)
    return image.resize((new_width, new_height))

def grayify(image):
    return image.convert("L")

def pixels_to_ascii(image):
    pixels = image.getdata()
    return "".join([ASCII_CHARS[pixel // 25] for pixel in pixels])

def image_to_ascii(path, width=80):
    image = Image.open(path)
    image = resize(image, width)
    image = grayify(image)

    ascii_str = pixels_to_ascii(image)
    pixel_count = len(ascii_str)
    ascii_image = "\n".join(
        ascii_str[i:(i + width)] for i in range(0, pixel_count, width)
    )
    return ascii_image

ascii_art = image_to_ascii("componets\dino.jpeg", 90)

with open("ascii.txt", "w") as f:
    f.write(ascii_art)

print("ASCII generated")
