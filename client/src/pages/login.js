import React from 'react';

export default function Login() {

const style2 = {backgroundImage : "url('https://images.pexels.com/photos/7232397/pexels-photo-7232397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"}

  return<div class="flex h-screen w-full items-center justify-center bg-  -900 bg-cover bg-no-repeat" style={style2}>
    <div class="rounded-xl bg-white bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
      <div class="text-black">
        <div class="mb-8 flex flex-col items-center">
          <img src="https://www.logo.wine/a/logo/Instagram/Instagram-Glyph-Color-Logo.wine.svg" width="150" alt="" srcset="" />
          <h1 class="mb-2 text-2xl">Instagram</h1>
          <span class="text-black">Enter Login Details</span>
        </div>
        <form action="#">
          <div class="mb-4 text-lg">
            <input class="rounded-3xl border-none bg-white-400 bg-opacity-50 px-6 py-2 text-center text-black placeholder-black-100 shadow-lg outline-none backdrop-blur-md" type="text" name="name" placeholder="Email or userID" />
          </div>
  
          <div class="mb-4 text-lg">
            <input class="rounded-3xl border-none bg-white-400 bg-opacity-10 px-6 py-2 text-center text-black placeholder-black-1 shadow-lg outline-none backdrop-blur-md" type="Password" name="name" placeholder="Password" />
          </div>
          <div class="mt-8 flex justify-center text-lg text-black">
            <button type="submit" class="rounded-3xl bg-white-400 bg-opacity-50 px-10 py-2 text-black shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-white">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
}
