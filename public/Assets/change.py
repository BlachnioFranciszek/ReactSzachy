from PIL import Image

def png_to_svg(png_path, svg_path):
    img = Image.open(png_path).convert("RGBA")
    w, h = img.size
    pixels = img.load()

    with open(svg_path, "w") as f:
        f.write(f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" shape-rendering="crispEdges">\n')
        for y in range(h):
            for x in range(w):
                r, g, b, a = pixels[x, y]
                if a > 0:  # skip transparent pixels
                    f.write(f'<rect x="{x}" y="{y}" width="1" height="1" fill="rgb({r},{g},{b})" fill-opacity="{a/255:.3f}"/>\n')
        f.write("</svg>")

png_to_svg("BGoniec.png", "BGoniec.svg")
png_to_svg("BHetman.png", "BHetman.svg")
png_to_svg("BKrol.png", "BKrol.svg")
png_to_svg("BPion.png", "BPion.svg")
png_to_svg("BSkoczek.png", "BSkoczek.svg")
png_to_svg("BWierza.png", "BWierza.svg")
png_to_svg("CGoniec.png", "CGoniec.svg")
png_to_svg("CHetman.png", "CHetman.svg")
png_to_svg("CKrol.png", "CKrol.svg")
png_to_svg("CPion.png", "CPion.svg")
png_to_svg("CSkoczek.png", "CSkoczek.svg")
png_to_svg("CWierza.png", "CWierza.svg")

