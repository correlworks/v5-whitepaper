import PyPDF2

def extract_text_from_pdf(pdf_path):
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            return text
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    pdf_path = "/Users/bebe/Downloads/v5셀링포인트/V5 셀링포인트.pdf"
    content = extract_text_from_pdf(pdf_path)
    print(content)
