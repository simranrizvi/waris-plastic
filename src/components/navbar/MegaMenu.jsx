"use client"
import React from "react"
import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { categories } from "./MenuData"

export default function MegaMenu() {
  return (
    <nav className="w-full bg-[#454545]">
      <div className="container mx-auto">
        <NavigationMenu>
          <NavigationMenuList className="flex space-x-0">
            
            {/* HOME Link */}
            <NavigationMenuItem>
              <Link
                href="/"
                className="px-6 py-3 text-white font-bold text-sm 
                hover:bg-[#D61F26] hover:text-white 
                transition-colors duration-200 
                cursor-pointer uppercase block"
              >
                HOME
              </Link>
            </NavigationMenuItem>

            {/* Dynamic Categories */}
            {categories.map((cat) => (
              <NavigationMenuItem key={cat.id}>
                
                <Link href={`/category/${cat.id}`}>
                  <NavigationMenuTrigger
  className="bg-transparent text-white font-bold text-sm 
  px-6 py-6 uppercase shadow-none rounded-none
  hover:!bg-[#D61F26] hover:!text-white
  focus:!bg-[#D61F26] focus:!text-white
  data-[state=open]:!bg-[#D61F26] 
  data-[state=open]:!text-white
  transition-colors duration-200"
>
  {cat.title}
</NavigationMenuTrigger>
                </Link>

                <NavigationMenuContent>
                  {cat.id === "more" ? (
                    <div className="flex w-[850px] bg-white shadow-2xl  p-8 text-black">
                      {cat.sections.map((section, sIdx) => (
                        <div
                          key={sIdx}
                          className="w-1/2 px-4 border-r last:border-r-0 border-gray-100"
                        >
                          <h3 className="text-gray-800 font-bold text-[13px] border-b pb-2 mb-4 uppercase flex items-center">
                            <span className="mr-2 text-[10px] text-gray-400">❖</span>
                            {section.heading}
                          </h3>

                          <ul className="space-y-2">
                            {section.links.map((link) => (
                              <li key={link}>
                                <Link
                                  href={`/category/${link
                                    .toLowerCase()
                                    .trim()
                                    .replace(/\s+/g, "-")}`}
                                  className="group flex items-center text-[12px] font-bold 
                                  text-gray-700 hover:bg-white hover:text-[#D61F26]
                                  px-3 py-2 rounded 
                                  transition-colors duration-200 cursor-pointer"
                                >
                                  <span className="mr-2 text-[10px] text-gray-400 group-hover:text-[#D61F26]">
                                    ❖
                                  </span>
                                  {link}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Regular Layout */
                    <div className="flex w-[1000px] bg-white shadow-2xl text-black">
                      
                      {/* Left Side */}
                      <div className="w-[30%] bg-white p-6 border-r border-gray-100">
                        <ul className="space-y-2">
                          {cat.links?.map((link) => (
                            <li key={link}>
                              <Link
                                href={`/category/${link
                                  .toLowerCase()
                                  .trim()
                                  .replace(/\s+/g, "-")}`}
                                className="group flex items-center text-[12px] font-bold 
                                text-gray-700 hover:bg-[#D61F26] hover:text-white
                                px-3 py-2 rounded
                                transition-colors duration-200 cursor-pointer"
                              >
                                <span className="mr-2 text-[10px] text-gray-400 group-hover:text-white">
                                  ❖
                                </span>
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Side */}
                      <div className="w-[70%] p-6">
                        <h3 className="text-[#2E3192] font-black text-[12px] uppercase mb-6 border-b pb-2">
                          Best Selling Products
                        </h3>

                        <div className="grid grid-cols-2 gap-6">
                          {cat.products?.map((prod, idx) => (
                            <div
                              key={idx}
                              className="relative border border-gray-100 p-2 hover:shadow-md transition-shadow"
                            >
                              <div className="text-center md:text-left">
                                <h4 className="text-gray-600 text-[14px] mb-1 truncate">
                                  {prod.name}
                                </h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-[#ED1C24] font-bold text-base">
                                    Rs.{prod.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                      </div>
                    </div>
                  )}
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}

          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}