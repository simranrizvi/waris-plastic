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
              <Link href="/" className="px-6 py-3 text-white font-bold text-sm hover:bg-[#1e206b] cursor-pointer uppercase block">
                HOME
              </Link>
            </NavigationMenuItem>

            {/* Dynamic Categories */}
            {categories.map((cat) => (
              <NavigationMenuItem key={cat.id}>
                <Link href={`/category/${cat.id}`}>
                    <NavigationMenuTrigger className="bg-transparent text-white font-bold text-sm px-6 py-6 hover:bg-[#1e206b] border-none focus:bg-[#1e206b] data-[state=open]:bg-[#1e206b] uppercase">
                    {cat.title}
                    </NavigationMenuTrigger>
                </Link>
                
                <NavigationMenuContent>
                  {cat.id === "more" ? (
                    <div className="flex w-[850px] bg-white shadow-2xl border-t-2 border-blue-900 p-8 text-black">
                      {cat.sections.map((section, sIdx) => (
                        <div key={sIdx} className="w-1/2 px-4 border-r last:border-r-0 border-gray-100">
                          <h3 className="text-gray-800 font-bold text-[13px] border-b pb-2 mb-4 uppercase flex items-center">
                            <span className="mr-2 text-[10px] text-gray-400">❖</span>
                            {section.heading}
                          </h3>
                          <ul className="space-y-4">
                            {section.links.map((link) => (
                              <li key={link}>
                                {/* VIP: Sub-category ko main category path de diya */}
                                <Link 
                                  href={`/category/${link.toLowerCase().trim().replace(/\s+/g, "-")}`}
                                  className="group flex items-center text-[12px] font-bold text-gray-700 hover:text-blue-800 cursor-pointer"
                                >
                                  <span className="mr-2 text-[10px] text-gray-400 group-hover:text-blue-800">❖</span>
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
                    <div className="flex w-[1000px] bg-white shadow-2xl border-t-2 border-blue-900 text-black">
                      
                      {/* Left Side: Sidebar Links (Treating as Main Categories) */}
                      <div className="w-[30%] bg-white p-6 border-r border-gray-100">
                        <ul className="space-y-4">
                          {cat.links?.map((link) => (
                            <li key={link}>
                              {/* VIP: Yahan humne Parent ID hata di, direct link ko slug banaya */}
                              <Link 
                                href={`/category/${link.toLowerCase().trim().replace(/\s+/g, "-")}`}
                                className="group flex items-center text-[12px] font-bold text-gray-700 hover:text-blue-800 cursor-pointer"
                              >
                                <span className="mr-2 text-[10px] text-gray-400 group-hover:text-blue-800">❖</span>
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Side: Product Display */}
                      <div className="w-[70%] p-6">
                        <h3 className="text-[#2E3192] font-black text-[12px] uppercase mb-6 border-b pb-2">
                          Best Selling Products
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                          {cat.products?.map((prod, idx) => (
                            <div key={idx} className="relative border border-gray-100 p-2 hover:shadow-md transition-shadow">
                               {/* Product Details logic yahan wahi rahegi */}
                               <div className="text-center md:text-left">
                                <h4 className="text-gray-600 text-[14px] mb-1 truncate">{prod.name}</h4>
                                <div className="flex items-center gap-2">
                                  <span className="text-[#ED1C24] font-bold text-base">Rs.{prod.price}</span>
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