# Uni Club

A project where students can see their class timetable, know professors more and rate them and trade goods built with Next.js. It uses MongoDB for the main database and Supabase specifically to handle real-time features for the chat section.

## 🛠️ Tech Stack

- **Core**: Next.js
- **UI**: `@mui/material` & `Tailwind CSS`
- **Database**: `Mongoose` (MongoDB) for all primary data storage
- **Real-time Chat**: `@supabase/supabase-js` (used for the chat feature's real-time updates)
- **Auth**: `jsonwebtoken` & `bcryptjs`
- **Image Hosting**: `ImgBB` (for storing images)
- **State Management**: `Zustand`
- **Validation**: `Zod`
- **Others**: `lucide-react` and `react-hot-toast`.

## 🚀 How to Run

Make sure you have Node.js (v18+) installed.

1. **Clone the repo**
   ```bash
   git clone https://github.com/alireza-rezaei22/Uni-Club.git
   cd Uni-Club
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
4. **Set up environment variables**
   Create a .env.local file in the root:
   ```bash
   ACCESSTOKEN_SECRETKEY = value
   NEXT_PUBLIC_SITE_URL= value
   MONGODB_URI= value
   NEXT_PUBLIC_IMG_HOST_URL= value
   NEXT_PUBLIC_IMG_API_KEY= value
   NEXT_PUBLIC_SUPABASE_URL= value
   NEXT_PUBLIC_SUPABASE_ANON_KEY= value
   ```
5. **Run development server**
   ```bash
   npm run dev
   ```
## 🖥️ Self-Hosting
If you want to host it yourself instead of Vercel, you can use these simple commands:
```bash
npm run build
npm start
```
## 📝 Notes
- The main data is stored in MongoDB.
- Supabase is only used to make the chat section real-time.
- ImgBB is used for storing images.
- Don't forget to set up your `.env.local` file before running.
