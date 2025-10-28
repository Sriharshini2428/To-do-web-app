# To-Do App

A modern, full-stack to-do application built with Next.js, React, and TypeScript. Manage your tasks efficiently with a clean, intuitive interface.

## Features

- Create, read, update, and delete tasks
- Filter tasks by status (All, Active, Completed)
- Task statistics dashboard
- Persistent storage with localStorage
- RESTful API endpoints
- Responsive design with Tailwind CSS
- Type-safe with TypeScript

## Tech Stack

- **Frontend**: React 19, Next.js 16, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Storage**: localStorage (browser-based persistence)
- **API**: Next.js Route Handlers
- **Deployment**: Vercel

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   └── tasks/
│   │       ├── route.ts          # GET/POST tasks
│   │       └── [id]/route.ts     # GET/PUT/DELETE specific task
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main page
│   └── globals.css               # Global styles
├── components/
│   ├── task-form.tsx             # Task creation form
│   ├── task-list.tsx             # Task list display
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── db.ts                     # Database functions
│   ├── api-client.ts             # API client utilities
│   └── utils.ts                  # Utility functions
├── types/
│   └── task.ts                   # TypeScript interfaces
└── public/                       # Static assets
\`\`\`

## Getting Started

### Prerequisites

- Node.js 18+ or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd todo-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### API Endpoints

#### Get All Tasks
\`\`\`
GET /api/tasks
Response: { tasks: Task[] }
\`\`\`

#### Get Single Task
\`\`\`
GET /api/tasks/[id]
Response: Task
\`\`\`

#### Create Task
\`\`\`
POST /api/tasks
Body: { title: string, description?: string, date?: string, time?: string }
Response: Task
\`\`\`

#### Update Task
\`\`\`
PUT /api/tasks/[id]
Body: Partial<Task>
Response: Task
\`\`\`

#### Delete Task
\`\`\`
DELETE /api/tasks/[id]
Response: { success: boolean }
\`\`\`

## Data Model

\`\`\`typescript
interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  date?: string
  time?: string
  createdAt: string
}
\`\`\`

## Storage

The app uses browser localStorage for persistence. Data is automatically saved whenever tasks are modified. The storage key is `todo_tasks_db`.

To clear all data:
\`\`\`javascript
localStorage.removeItem('todo_tasks_db')
\`\`\`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your repository
4. Vercel will automatically detect Next.js and configure the build settings
5. Click "Deploy"

Your app will be live at `https://your-project.vercel.app`

### Environment Variables

No environment variables are required for this app. All data is stored locally in the browser.

### Production Considerations

For a production app, consider:

1. **Database Migration**: Replace localStorage with a proper database (PostgreSQL, MongoDB, etc.)
2. **Authentication**: Add user authentication to support multiple users
3. **API Security**: Implement authentication middleware for API routes
4. **Error Handling**: Add comprehensive error logging and monitoring
5. **Performance**: Implement caching strategies and optimize queries

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please open an issue on GitHub or contact the development team.

## Future Enhancements

- User authentication and multi-user support
- Database integration (PostgreSQL/MongoDB)
- Task categories and tags
- Due date reminders and notifications
- Task priority levels
- Recurring tasks
- Dark mode toggle
- Mobile app (React Native)
- Collaborative task sharing
