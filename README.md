# AI Resume Analyzer

AI Resume Analyzer is a Node.js backend application that accepts PDF resume uploads, extracts text, and uses OpenAI to analyze and return structured resume insights. It is built with Fastify, supports multipart uploads, parses PDF content with `pdf-parse`, and connects to MySQL for database support.

## Features

- Upload PDF resumes via `/api/resume/upload`
- Extract resume text from PDF files
- Send resume content to OpenAI for analysis
- Return AI-generated structured resume insights
- Simple Fastify-based API server
- MySQL database connection ready via environment configuration

## Tech stack

- Node.js
- Fastify
- `@fastify/multipart`
- `pdf-parse`
- OpenAI Node.js SDK
- `mysql2`
- `dotenv`

## Project structure

- `src/server.js` - Server bootstrap and startup logic
- `src/app.js` - Fastify application and routes registration
- `src/routes/resume.routes.js` - Resume upload endpoint implementation
- `src/services/ai.service.js` - OpenAI integration and resume analysis
- `src/db/db.js` - MySQL connection setup
- `src/utils/pdfParser.js` - PDF parsing helper
- `src/middleware/upload.middlerware.js` - Multer upload middleware (currently available for future use)
- `uploads/` - Saved uploaded PDF files

## Getting Started

### Install dependencies

```bash
npm install
```

### Environment variables

Create a `.env` file in the project root with the following values:

```env
OPENAI_API_KEY=your_openai_api_key
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

If you are not using the database connection, the app will still start, but remove or ignore the database environment values.

### Run the server

```bash
node src/server.js
```

The server listens on port `3000` by default.

## API Usage

### Upload a resume

Endpoint: `POST /api/resume/upload`

Use `multipart/form-data` with the following fields:

- `file` - the PDF resume file
- `query` - optional text prompt or question for the AI analyzer

#### Example using `curl`

```bash
curl -X POST http://localhost:3000/api/resume/upload \
  -F "file=@resume.pdf" \
  -F "query=Analyze this resume for relevant skills and experience"
```

#### Successful response

```json
{
  "message": "Done ✅",
  "filename": "1691234567890.pdf",
  "query": "Analyze this resume for relevant skills and experience",
  "analysis": {
    // AI response parsed as JSON when possible
  }
}
```

## Notes

- The current upload route stores PDF files in `uploads/`.
- The AI analysis uses the `gpt-4.1-mini` model.
- `src/middleware/upload.middlerware.js` is included for Multer-based upload handling but is not currently wired into the route.

## Improvements

Possible next steps:

- Add request validation and better error handling
- Add a frontend UI or Postman collection for testing
- Implement resume storage and retrieval in MySQL
- Add automated tests

## License

ISC

