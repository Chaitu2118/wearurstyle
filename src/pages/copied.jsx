<div className="w-full max-w-[571px] min-h-[650px] px-6 md:px-10 lg:px-12 py-10 relative">

        {/* Guest */}
        <div className="absolute top-6 right-6 text-sm text-gray-500">
          Guest
        </div>

          <div className="w-[529px] px-[15px] flex flex-col gap-[18px]">
            {/* Tabs */}
            <div className="w-full max-w-[250px] mx-auto flex justify-between text-xl md:text-2xl font-bold mt-8">
              <span 
                className="text-black cursor-pointer"
                onClick={() => navigate("/Registration")}
              >
                Register
              </span>
              <span className="text-[#1f4e79] border-b-2 border-[#1f4e79] pb-1 cursor-pointer">
                Login
              </span>
            </div>

            {/* Welcome */}
            <h3 className="text-center text-lg md:text-xl font-bold mt-8 mb-10 text-black">
              Welcome back
            </h3>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>

              {/* Email */}
              <div>
                <label className="text-sm font-bold">
                  <span className="text-red-500">*</span>E Mail
                </label>
                <input
                  type="email"
                  placeholder="Enter your mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-2 px-4 py-3 border border-gray-400 bg-white focus:outline-none"
                />
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-bold">
                  <span className="text-red-500">*</span>Password
                </label>

                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-400 bg-white focus:outline-none"
                  />

                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>

              {/* Remember + Forgot */}
              <div className="flex justify-between items-center text-sm mt-2">
                <label className="flex items-center gap-2 text-gray-700">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-[#041B2F]"
                  />
                  Remember Me
                </label>

                <span className="text-red-500 cursor-pointer">
                  Forgot password?
                </span>
              </div>

              {/* Continue Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-[#06283D] text-white py-3 text-lg font-medium"
              >
                {loading ? "Logging in..." : "Continue"}
              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center my-10">
              <div className="flex-1 h-px bg-gray-400"></div>
              <span className="px-4 text-sm text-gray-600">
                or continue with
              </span>
              <div className="flex-1 h-px bg-gray-400"></div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-4 md:gap-6 w-full max-w-[391px] mx-auto">

              <button className="w-[64px] h-[56px] md:w-[74px] md:h-[64px] border border-gray-400 bg-white cursor-pointer flex items-center justify-center">
                <FcGoogle size={24} />
              </button>

              <button className="w-[64px] h-[56px] md:w-[74px] md:h-[64px] border border-gray-400 bg-white cursor-pointer flex items-center justify-center">
                <FaFacebookF size={22} className="text-blue-600" />
              </button>

              <button className="w-[64px] h-[56px] md:w-[74px] md:h-[64px] border border-gray-400 bg-white cursor-pointer flex items-center justify-center">
                <FaApple size={22} />
              </button>

            </div>
          </div>
      </div>


{/* Email */}
          <div>
            <label className="text-[15px] font-bold">
              <span className="text-red-500">*</span>E Mail
            </label>
            <input
              type="email"
              placeholder="Enter your mail"
              className="w-full h-[50px] mt-2 border border-gray-400 px-3"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-[15px] font-bold">
              <span className="text-red-500">*</span>Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full h-[50px] mt-2 border border-gray-400 px-3"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm mt-2">
            <label className="flex items-center gap-2 text-gray-700">
              <input
                type="checkbox"
                className="w-4 h-4 accent-[#041B2F]"
              />
                Remember Me
              </label>

              <span 
                className="text-red-500 cursor-pointer"
                onClick={() => navigate("/ForgotPassword")}
              >
                Forgot password?
              </span>
          </div>

          {/* Submit Button */}
          <button 
            className="w-full h-[60px] bg-[#072C47] text-white text-lg"
            onClick={handleSubmit}
          >
            Submit
          </button>


//   return (
//     <Layout>
//       <div className="w-full max-w-[571px] min-h-[650px] flex justify-center items-center">

//         {/* Exact Form Container */}
//         <div className="w-[529px] px-[15px] flex flex-col gap-[18px]">

//           {/* Guest */}
//           <div className="absolute top-20 right-50 text-sm text-gray-500">
//             Guest
//           </div>


//           {/* Tabs */}
//           <div className="flex justify-center w-[475px] h-[48px] gap-26 mb-4">
//             <h2 className="text-[26px] text-[#1f4e79] font-bold border-b-2 border-[#1f4e79]-600 pb-1">
//               Register
//             </h2>
//             <h2 
//               className="text-[26px] font-bold text-black cursor-pointer"
//               onClick={() => navigate("/Login")}  
//             >
//               Login
//             </h2>
//           </div>
//         <form onSubmit={handleSubmit}>
//           {/* First + Last Name */}
//           <div className="flex gap-6">
//             <div className="flex-1">
//               <label className="text-[15px] font-bold">
//                 <span className="text-red-500">*</span>First Name
//               </label>
//               <input
//                 name="firstName"
//                 type="text"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 placeholder="Enter your first name"
//                 className="w-full h-[50px] mt-2 border border-gray-400 px-3"
//               />
//             </div>
          
//             <div className="flex-1">
//               <label className="text-[15px] font-bold">
//                 <span className="text-red-500">*</span>Last Name
//               </label>
//               <input
//                 name="lastName"
//                 type="text"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 placeholder="Enter your last name"
//                 className="w-full h-[50px] mt-2 border border-gray-400 px-3"
//               />
//             </div>
//           </div>
//           <br />
//           {/* Email */}
//           <div>
//             <label className="text-[15px] font-bold">
//               <span className="text-red-500">*</span>E Mail
//             </label>
//             <input
//               name="email"
//               type="email"
//               value={formData.email}
//               onChange={handleChange}
//               placeholder="Enter your mail"
//               className="w-full h-[50px] mt-2 border border-gray-400 px-3"
//             />
//           </div>
//           <br />
//           {/* Password */}
//           <div>
//             <label className="text-[15px] font-bold">
//               <span className="text-red-500">*</span>Password
//             </label>
//             <input
//               name="password"
//               type={showPassword ? "text" : "password"}
//               value={formData.password}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full h-[50px] mt-2 border border-gray-400 px-3"
//             />
//             <span
//               // className="absolute right-3 top-[48px] cursor-pointer text-gray-600"
//               className="absolute right-60 top-113 -translate-y-1/2 cursor-pointer text-gray-600"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//           <br />
//           {/* Confirm Password */}
//           <div>
//             <label className="text-[15px] font-bold">
//               <span className="text-red-500">*</span>Confirm Password
//             </label>
//             <input
//               name="confirmPassword"
//               type={showConfirmPassword ? "text" : "password"}
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               placeholder="Enter your password"
//               className="w-full h-[50px] mt-2 border border-gray-400 px-3"
//             />
//             <span
//               // className="absolute right-3 top-[48px] cursor-pointer text-gray-600"
//               className="absolute right-60 top-140 -translate-y-1/2 cursor-pointer text-gray-600"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//             >
//               {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
//           </div>
//           <br />
//           {/* Terms */}
//           <div className="flex items-center gap-2 text-sm text-gray-600">
//             <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className="w-4 h-4 accent-[#041B2F]" />
//             <span>I agree to terms & conditions</span>
//           </div>
//           <br />
//           {/* Submit Button (Now Perfectly Aligned) */}
//           <button 
//             type="submit"
//             className="w-full h-[60px] bg-[#072C47] text-white text-lg"
//           >
//             Submit
//           </button>
//         </form>
  
//           {/* Divider */}
//           <div className="flex items-center gap-4 mt-4">
//             <div className="flex-1 h-[1px] bg-gray-400"></div>
//             <span className="text-sm text-gray-500">or continue with</span>
//             <div className="flex-1 h-[1px] bg-gray-400"></div>
//           </div>

//           {/* Social Icons */}
//           <div className="flex justify-center gap-4 md:gap-6 w-full max-w-[391px] mx-auto">

//             <button className="w-[64px] h-[56px] md:w-[74px] md:h-[64px] border border-gray-400 bg-white cursor-pointer flex items-center justify-center">
//               <FcGoogle size={24} />
//             </button>

//             <button className="w-[64px] h-[56px] md:w-[74px] md:h-[64px] border border-gray-400 bg-white cursor-pointer flex items-center justify-center">
//               <FaFacebookF size={22} className="text-blue-600" />
//             </button>

//             <button className="w-[64px] h-[56px] md:w-[74px] md:h-[64px] border border-gray-400 bg-white cursor-pointer flex items-center justify-center">
//               <FaApple size={22} />
//             </button>

//           </div>

//         </div>
//       </div>
//     </Layout>
//   )
// }
