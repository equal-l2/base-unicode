import unicodedata
import json


def generate_table() -> list[int]:
    table: list[int] = []
    for i in range(0x10FFFF + 1):
        skip_category = ["C", "Z"]  # "Separator", "Other"
        if any(c in unicodedata.category(chr(i)) for c in skip_category):
            continue
        table.append(i)
    return table


if __name__ == "__main__":
    table = generate_table()
    json.dump(table, open("unicode_table.json", "w", encoding="utf-8"))
