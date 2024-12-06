# Lexi 📜
Google Chrome Built-in-AI Challenge

## Inspiration
Navigating legal documents and contracts can be a daunting task for individuals and businesses alike. Complex language, hidden risks, and the challenge of understanding multilingual agreements often result in missed details and misinformed decisions. Recognizing this widespread need, we created **Lexi** to empower users by simplifying the way legal documents are interpreted. Drawing inspiration from the potential of Google Chrome’s built-in AI capabilities, including the Summarization API and Translation API, we envisioned Lexi as a tool to transform intricate legal language into clear, actionable insights. 

The name **Lexi** derives from the Latin word *lex*, meaning "law," reflecting the app's focus on legal clarity and insight. Our mission is to make legal documents accessible, understandable, and manageable for everyone, regardless of their expertise or native language. By combining Google's AI API's with a user-friendly interface, Lexi helps users navigate contracts confidently, identify risks effectively, and bridge language barriers—all directly within their browser.

## What it does
**Lexi** uses the power of AI to analyze legal documents and contracts, transforming complex language into clear summaries and actionable insights. By detecting potential risks such as liabilities, penalties, and breaches, Lexi ensures users can make informed decisions. Additionally, Lexi offers multilingual translation capabilities, enabling users to understand contracts regardless of language barriers. Through its intuitive interface, users can upload documents, receive risk-focused insights, and access summaries and translations tailored to their needs—all seamlessly integrated within their browser.

## How we built it
We developed **Lexi** as a Chrome Extension leveraging Google Chrome’s built-in AI APIs, which include the Summarization API and Translation API. The extension’s frontend was built using JavaScript, HTML, and CSS to create an intuitive and seamless user experience. The backend processes extracted document text using `pdf.js` for parsing PDF files and employs JavaScript functions to detect and highlight risks. The AI-powered summarization and translation features are seamlessly integrated into the browser, ensuring all operations occur locally for enhanced performance and privacy. This approach allows **Lexi** to efficiently process and analyze legal documents without the need for external server calls.

## Challenges we ran into
One of the difficulties we encountered was ensuring accurate identification of risks without duplicating results, as some sentences contained multiple overlapping keywords. Integrating the Summarization and Translation APIs into the browser environment also posed initial hurdles, particularly in managing API capabilities and handling multilingual outputs seamlessly. These challenges required iterative debugging and creative problem-solving to achieve a reliable and user-friendly experience.

## Accomplishments that we're proud of
We’re proud of successfully creating a Chrome Extension that leverages AI to simplify and enhance the understanding of legal documents. Integrating the Summarization and Translation APIs to deliver clear summaries and multilingual support within the browser was a significant milestone. Additionally, our ability to accurately identify and highlight potential risks in contracts ensures users can make informed decisions with confidence. Overcoming challenges such as managing text extraction and refining risk detection algorithms allowed us to deliver a polished and reliable tool. The seamless integration of these features into a user-friendly interface is a testament to our team's collaboration and technical innovation.

## What we learned
Through the development of **Lexi**, we gained valuable insights into the complexities of working with legal text and how AI can simplify this domain. We deepened our understanding of Chrome’s built-in AI APIs, including the Summarization and Translation APIs, and their potential to deliver real-time, efficient solutions within the browser environment. Additionally, we learned how to optimize text extraction from documents and ensure seamless multilingual support. This project also enhanced our collaborative problem-solving skills, particularly in overcoming integration challenges and creating a user-centric experience.

## What's next for Lexi
Moving forward, we aim to enhance **Lexi** with advanced NLP-based risk detection to provide deeper contextual understanding and more precise identification of potential issues in legal documents. By incorporating machine learning models like BERT or GPT, Lexi could go beyond keyword detection to analyze the semantics of contracts, offering users more nuanced insights. We also plan to introduce features such as interactive clause analysis, custom risk categorization, and secure cloud storage for document management. Our ultimate goal is to make Lexi an indispensable tool for navigating legal documents with confidence and ease.

