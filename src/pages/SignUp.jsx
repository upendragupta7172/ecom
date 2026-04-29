
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Loader2 } from 'lucide-react' // Loader2 for loading state
import { Link, useNavigate } from 'react-router-dom'
import axios from "@/api/axios";
import { toast } from 'sonner'

const SignUp = () => {
  const navigate = useNavigate()
  const [showp, setshowp] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // 1. Form Data State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  // 2. Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }



  const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)

  try {
    console.log("Submitting Data:", formData)
    
    // 1. Axios call mein hi headers bhej sakte hain (waise Axios khud hi handle kar leta hai)
    const res = await axios.post('/api/user/registeruser', formData)
    
    console.log(res.data) // Check karein backend se kya aa raha hai

    // 2. Syntax Error hataya (Headers wala block jo aapne beech mein likha tha)

    if (res.data.success) {
      toast.success(res.data.message || "Signup Successful!")
      
      // 3. Navigation (Spelling check: Varify ya Verify?)
      navigate('/api/user/verify') 
    } else {
      toast.error(res.data.message || "Kuch galti hui")
    }

  } catch (error) {
    console.error("Signup failed:", error)
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status (4xx, 5xx)
      toast.error(error.response.data?.message || error.response.data?.error || "Signup failed")
    } else if (error.request) {
      // Request was made but no response
      toast.error("Server is not responding. Please try again later.")
    } else {
      // Something else happened
      toast.error(error.message || "Server error occurred")
    }
  } finally {
    setLoading(false)
  }
}

  return (
    <div className="flex items-center justify-center min-h-screen"> 
      {/* ml-96 aur mt-36 ki jagah flex use karna zyada responsive hai */}
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Upendra"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Gupta"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="upendra@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2 relative">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    name="password"
                    type={showp ? "text" : 'password'} 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                  />
                  <div 
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setshowp(!showp)}
                  >
                    {showp ? <EyeOff size={18} /> : <Eye size={18} />}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex-col gap-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Signup"}
            </Button>
            <p className="text-sm text-center">
              Already have an account?{" "}
              <Link className='hover:underline text-primary font-medium' to='/login'>
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

export default SignUp



// today
