import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import toast from "react-hot-toast"
import useAxios from "../hooks/useAxios"

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const navigate = useNavigate()
  const { loading, error, data, apiCall } = useAxios()

  useEffect(() => {
    if (data?.success) {
      toast.success(data?.message)
      localStorage.setItem("user", JSON.stringify(data?.user))
      setTimeout(() => {
        navigate("/", { replace: true })
      }, 2500)
      return
    }
    if (error) {
      toast.error(error)
    }
  }, [data, error, navigate])

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields")
      return
    }
    apiCall("/login", { method: "post", data: formData })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-600 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-8">Login</h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full border-b-2 border-gray-300 px-0 py-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-500 peer"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
                peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Email
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="w-full border-b-2 border-gray-300 px-0 py-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-500 peer"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
                peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Password
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 text-white rounded-lg bg-gradient-to-r from-green-500 to-teal-600 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mx-auto text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-green-500 hover:text-green-700 font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

