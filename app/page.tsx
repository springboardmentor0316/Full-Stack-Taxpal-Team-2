"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">TaxPal</h1>
          <p className="text-xl text-slate-300 mb-2">Full-Stack MERN Application</p>
          <p className="text-slate-400">MongoDB • Express • React • Node.js</p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Status Card */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Setup Complete</CardTitle>
              <CardDescription>Your MERN stack application is configured and ready to run</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">✓ Backend</h3>
                  <p className="text-sm text-slate-300">Express.js + MongoDB + Authentication</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-400 mb-2">✓ Frontend</h3>
                  <p className="text-sm text-slate-300">React + Context API + Routing</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Start Tabs */}
          <Tabs defaultValue="setup" className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <TabsList className="grid w-full grid-cols-3 bg-slate-700">
              <TabsTrigger value="setup">Setup</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="files">Files</TabsTrigger>
            </TabsList>

            <TabsContent value="setup" className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold">Quick Start Guide</h3>
              <div className="space-y-3">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-mono font-semibold text-blue-400 mb-2">1. Backend Setup</h4>
                  <pre className="bg-slate-900 p-3 rounded text-sm overflow-x-auto">
                    <code>{`cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev`}</code>
                  </pre>
                  <p className="text-xs text-slate-400 mt-2">Runs on http://localhost:5000</p>
                </div>

                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-mono font-semibold text-blue-400 mb-2">2. Frontend Setup</h4>
                  <pre className="bg-slate-900 p-3 rounded text-sm overflow-x-auto">
                    <code>{`cd frontend
npm install
cp .env.example .env
# Update .env if backend runs on different port
npm start`}</code>
                  </pre>
                  <p className="text-xs text-slate-400 mt-2">Runs on http://localhost:3000</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold">Authentication Features</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">User Registration</h4>
                  <p className="text-sm text-slate-300">
                    Sign up with email, username, password, country, and income bracket
                  </p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">User Login</h4>
                  <p className="text-sm text-slate-300">Secure login with JWT token generation and storage</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Forgot Password</h4>
                  <p className="text-sm text-slate-300">Request password reset with email verification</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Password Reset</h4>
                  <p className="text-sm text-slate-300">Verify code and set new password securely</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Context API</h4>
                  <p className="text-sm text-slate-300">Global auth state management across app</p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Validation</h4>
                  <p className="text-sm text-slate-300">Client-side and server-side input validation</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="files" className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold">Project Structure</h3>
              <div className="space-y-2 text-sm">
                <div className="bg-slate-700/50 p-3 rounded-lg font-mono">
                  <p className="text-blue-400">backend/</p>
                  <div className="ml-4 text-slate-300">
                    <p>├── server.js (main entry)</p>
                    <p>├── controllers/authController.js (logic)</p>
                    <p>├── models/User.js (MongoDB schema)</p>
                    <p>├── routes/authRoutes.js (endpoints)</p>
                    <p>├── middleware/ (validation, errors)</p>
                    <p>└── .env.example (config template)</p>
                  </div>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg font-mono">
                  <p className="text-blue-400">frontend/</p>
                  <div className="ml-4 text-slate-300">
                    <p>├── src/api/authApi.js (API calls)</p>
                    <p>├── src/context/AuthContext.js (state)</p>
                    <p>├── src/pages/ (Login, Register, etc)</p>
                    <p>├── src/utils/validation.js (form validation)</p>
                    <p>└── .env.example (config template)</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Environment Variables */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Required Environment Variables</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Backend (.env)</h4>
                <div className="bg-slate-900 p-4 rounded text-sm font-mono text-slate-300 space-y-1">
                  <p>MONGODB_URI=mongodb://localhost:27017/taxpal</p>
                  <p>JWT_SECRET=your-secret-key-here</p>
                  <p>PORT=5000</p>
                  <p>FRONTEND_URL=http://localhost:3000</p>
                  <p>EMAIL_USER=your-email@gmail.com (optional)</p>
                  <p>EMAIL_PASSWORD=your-app-password (optional)</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-200 mb-2">Frontend (.env)</h4>
                <div className="bg-slate-900 p-4 rounded text-sm font-mono text-slate-300">
                  <p>REACT_APP_API_URL=http://localhost:5000/api</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Endpoints */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">API Endpoints</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid gap-2 text-sm">
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <p className="font-mono text-green-400">POST /api/auth/register</p>
                  <p className="text-slate-400">Create new user account</p>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <p className="font-mono text-green-400">POST /api/auth/login</p>
                  <p className="text-slate-400">Login and get JWT token</p>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <p className="font-mono text-green-400">POST /api/auth/forgot-password</p>
                  <p className="text-slate-400">Request password reset code</p>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <p className="font-mono text-green-400">POST /api/auth/verify-token</p>
                  <p className="text-slate-400">Verify reset token validity</p>
                </div>
                <div className="bg-slate-700/50 p-3 rounded-lg">
                  <p className="font-mono text-green-400">POST /api/auth/set-password</p>
                  <p className="text-slate-400">Set new password after verification</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Start the backend server in a terminal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Start the frontend server in another terminal</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Open http://localhost:3000 to use the application</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-3">✓</span>
                  <span>Read SETUP_GUIDE.md for detailed documentation</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Footer Info */}
          <div className="text-center text-slate-400 text-sm">
            <p>This is a guide for the MERN Stack setup. The actual React frontend runs separately on port 3000.</p>
            <p className="mt-2">See SETUP_GUIDE.md for complete documentation and troubleshooting.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
