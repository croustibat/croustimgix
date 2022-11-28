# Devdu-flyimg

## Microservice de resize et de traitement d'image "On the fly"

Ce projet utilise :

-   Fastify (serveur web)
-   Sharp (https://github.com/lovell/sharp)
-   Imagist (https://github.com/riteable/imagist) !! version modifiée

## Exemple d'utilisation

On peut faire un appel au microservice comme ceci pour redimensionner l'image "on-the-fly" :

`https://my-url.com/i/images/ian-dooley-DuBNA1QMpPA.jpg?w=300&h=200`

## Transformations disponible

The transformations below are available to use as query parameters when requesting an image, or as the second argument of the `.get(url, {})` function.

-   **w**: Desired width in pixels. If it is not specified, it will depend on other parameters what the output width will be. For example, if height is specified, the width will scale relative to the height value respecting the aspect ratio.

-   **h**: Desired height in pixels. See width behavior.

-   **fit**: Type of fit. Possible values:
    -   `'cover'`: _(default)_. Same as CSS `background-size: cover`. If the proportions of the image differ from the element, it is cropped either vertically or horizontally so that no empty space remains.
    -   `'contain'`: Same as CSS `background-size: contain`. Scales the image as large as possible without cropping or stretching the image.
    -   `'inside'`: Resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified.
    -   `'outside'`: Resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified.
    -   `'fill'`: Scales the image to match both width and height, ignoring the aspect ratio.

*   **pos**: From where to crop the image (if width and height result in a different aspect ratio). Possible values:

    -   `'center'` _(default)_
    -   `'top'`
    -   `'bottom'`
    -   `'left'`
    -   `'right'`

    Two additional values, which are experimental and only work if the `fit` option equals `'cover'`:

    -   `'entropy'`: Focus on the region with the highest [entropy](https://en.wikipedia.org/wiki/Entropy_%28information_theory%29).
    -   `'attention'`: Focus on the region with the highest luminance frequency, color saturation and presence of skin tones.

*   **trim**: _(default: `false`)_. Trim unnecessary pixels from the image. Imagine the image having a white (or some other color) border around the edges. This option will crop the image to only contain the necessary part of the image. Possible values: [falsy/truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).

*   **max**: _(default: `false`)_. Enlarge the image to the specified width and height, if the source image is smaller. Possible values: [falsy/truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).

-   **flip**: How to flip/mirror the image. Possible values:
    -   `'h'`: Horizontal flip.
    -   `'v'`: Vertical flip.
    -   `'both'`: Flip both dimensions.

*   **q**: Quality of the output image. Possible values between `1` and `100`.

*   **i**: [Interpolation algorithm.](https://en.wikipedia.org/wiki/Image_scaling#Algorithms) Possible values:
    -   `'nearest'`
    -   `'cubic'`
    -   `'mitchell'`
    -   `'lanczos2'`
    -   `'lanczos3'` _(default)_

-   **bg**: Background color of the remaining space when the aspect ratio of the processed image is different from the original image. Possible values: A valid hex or RGB(A) color. For example: `'000'`, `'e5e5e5'`, `'32,64,128,0.5'`.

-   **r**: Rotate image. Possible values are positive and negative integers/floats. When rotating at angles which aren't divisible by 90 degrees, the image will automatically have a black background. If that's not desired, you can convert the image to a PNG (if it isn't already) with the `fmt` parameter. This will give the image a transparent background. Or you can change the background color with the `bg` parameter.

-   **tint**: Tint the image with a given color preserving the luminance. Possible values are valid hex or RGB(A) colors. See `bg` parameter for examples.

-   **blur**: Blur the image. Possible values between `0.3` and `1000`.

-   **sharp**: Sharpen the image. Possible values: [falsy/truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).

-   **neg**: Turn the image to a negative. Possible values: [falsy/truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).

-   **gs**: Turn the image black and white (greyscale). Possible values: [falsy/truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).

-   **meta**: _(default: `false`)_. Output with metadata (EXIF, XMP, IPTC), if present in the source file. Possible values: [falsy/truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy).

-   **fmt**: Output format. Default behavior is to output the same format as the source. If the source has an unsupported output format, it will default to `'jpeg'`. Possible values:
    -   `'jpeg'`
    -   `'png'`
    -   `'webp'`
