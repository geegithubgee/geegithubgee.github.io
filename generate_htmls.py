import os

bg_img_dir = "assets/images"
bg_json_dir = "assets/ui_element_jsons"
template_dir = "wTemplate.html"
html_out_path = ""

with open(template_dir, "r") as f:
    html_template_lines = f.readlines()

modified_lines = []
bg_imgs = [f for f in os.listdir(bg_img_dir) if os.path.isfile(os.path.join(bg_img_dir, f))]
for f in bg_imgs:
    img_path_tmp = os.path.join(bg_img_dir, f).replace("\\","/")
    for l in html_template_lines:
        modified_lines.append(l.replace("IMAGE_PATH_TO_BE_REPLACED", img_path_tmp))
    f = f[:f.rfind(".")] + ".html"
    fpath = os.path.join(html_out_path, f)
    print(fpath)
    with open(fpath, "w+") as ftmp:
        ftmp.writelines(modified_lines)
        modified_lines = []
