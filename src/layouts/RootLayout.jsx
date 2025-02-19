import { ClerkProvider, SignIn, SignedIn, SignedOut } from '@clerk/clerk-react';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const RootLayout = ({ children }) => {
  return (
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        elements: {
          formButtonPrimary: "bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2",
          card: "border-0 shadow-xl rounded-2xl",
          formField: "gap-3",
          formFieldInput: "rounded-xl border-gray-300 focus:border-purple-500 focus:ring-purple-500",
          socialButtonsBlockButton: "border-gray-300 hover:border-purple-500 transition-colors",
          socialButtonsProviderIcon: "w-6 h-6",
          formFieldLabel: "text-gray-700 font-medium",
          footerActionLink: "text-purple-600 hover:text-purple-700",
          headerTitle: "text-2xl font-bold text-gray-900",
          headerSubtitle: "text-gray-600"
        },
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "blockButton"
        }
      }}
    >
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-indigo-50">
        <SignedOut>
          <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fadeIn">
            <div className="w-full max-w-md text-center space-y-8">
              <div className="space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center shadow-lg">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-12 w-12 text-white" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" 
                    />
                  </svg>
                </div>
                <h1 className="text-4xl font-extrabold text-gray-900">Task Manager Pro</h1>
                <p className="text-gray-600 text-lg">Stay organized, boost productivity</p>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100 backdrop-blur-sm">
                <SignIn />
              </div>
              <p className="text-sm text-gray-500">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </div>
        </SignedOut>
        <SignedIn>
          {children}
        </SignedIn>
      </div>
    </ClerkProvider>
  );
};

export default RootLayout;