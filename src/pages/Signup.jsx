import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import useAxios from "../hooks/useAxios"

function Signup() {
  const [formInput, setFormInput] = useState({
    uname: "",
    email: "",
    password: "",
    cpassword: "",
  })

  const [inputErr, setError] = useState({
    uname: "",
    email: "",
    password: "",
  })

  const { data, loading, error, apiCall } = useAxios()
  const navigate = useNavigate()

  useEffect(() => {
    if (data?.success) {
      toast.success(data?.message)
      navigate("/")
      return
    }
    if (error) {
      toast.error(error)
    }
  }, [data, error, navigate])

  const handleSignup = async (e) => {
    e.preventDefault()
    if (
      !formInput.uname.trim() ||
      !formInput.email.trim() ||
      !formInput.password.trim() ||
      !formInput.cpassword.trim()
    ) {
      toast.error("Please fill all fields!")
      return
    }
    try {
      apiCall("/signup", {
        method: "post",
        data: { ...formInput, confirmPassword: formInput.cpassword },
      })
    } catch (error) {
      console.error("error in ", error)
      toast.error(error)
    }
  }

  const handleInput = (e) => {
    if (e.target.id === "uname") {
      const name = e.target.value.trim()
      setFormInput({ ...formInput, uname: e.target.value })
      if (name.length === 0) {
        setError({ ...inputErr, uname: "Enter user name" })
      } else {
        setError({ ...inputErr, uname: "" })
      }
      return
    }
    if (e.target.id === "email") {
      const email = e.target.value.trim()
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      setFormInput({ ...formInput, email: e.target.value })
      if (email.length === 0) {
        setError({ ...inputErr, email: "Enter email address" })
        return
      }
      if (!emailRegex.test(e.target.value)) {
        setError({ ...inputErr, email: "Enter valid email address" })
        return
      }
      setError({ ...inputErr, email: "" })
    }
    if (e.target.id === "password") {
      const password = e.target.value.trim()
      setFormInput({ ...formInput, password: e.target.value })
      if (password.length === 0 || password.length < 6) {
        setError({
          ...inputErr,
          password: "Password should consist of at least 6 characters",
        })
        return
      }
      setError({ ...inputErr, password: "" })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 to-green-700 p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-center mb-8">Create Account</h1>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-4">
            {/* Username Input */}
            <div className="relative">
              <input
                type="text"
                id="uname"
                value={formInput.uname}
                onChange={handleInput}
                className="w-full border-b-2 border-gray-300 px-0 py-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-700 peer"
                placeholder="Username"
              />
              <label
                htmlFor="uname"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
                peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Username
              </label>
              {inputErr.uname && <p className="text-red-500 text-xs mt-1">{inputErr.uname}</p>}
            </div>

            {/* Email Input */}
            <div className="relative">
              <input
                type="email"
                id="email"
                value={formInput.email}
                onChange={handleInput}
                className="w-full border-b-2 border-gray-300 px-0 py-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-700 peer"
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
              {inputErr.email && <p className="text-red-500 text-xs mt-1">{inputErr.email}</p>}
            </div>

            {/* Password Input */}
            <div className="relative">
              <input
                type="password"
                id="password"
                value={formInput.password}
                onChange={handleInput}
                className="w-full border-b-2 border-gray-300 px-0 py-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-700 peer"
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
              {inputErr.password && <p className="text-red-500 text-xs mt-1">{inputErr.password}</p>}
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <input
                type="password"
                id="cpassword"
                value={formInput.cpassword}
                onChange={(e) => setFormInput({ ...formInput, cpassword: e.target.value })}
                className="w-full border-b-2 border-gray-300 px-0 py-2 text-gray-900 placeholder-transparent focus:outline-none focus:border-green-700 peer"
                placeholder="Confirm Password"
              />
              <label
                htmlFor="cpassword"
                className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2
                peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
              >
                Confirm Password
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 text-white rounded-lg bg-gradient-to-r from-green-700 to-green-600 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700"
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
              "Sign Up"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 hover:text-green-700 font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup

