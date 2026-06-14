import React from 'react';
import { Leaf, ShoppingCart, User, Search, MapPin } from 'lucide-react';

interface HeaderProps {
  points: number;
}

const Header: React.FC<HeaderProps> = ({ points }) => {
  return (
    <header className="flex flex-col">
      {/* Top Main Header */}
      <div className="bg-amazon-dark text-white p-2 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-1 px-2 border border-transparent hover:border-white rounded-sm cursor-pointer py-1">
          <div className="bg-amazon-orange p-1 rounded-full">
            <Leaf size={20} className="text-amazon-dark" />
          </div>
          <span className="font-bold text-lg">SecondLife</span>
        </div>

        {/* Deliver To */}
        <div className="hidden md:flex flex-col px-2 border border-transparent hover:border-white rounded-sm cursor-pointer py-1">
          <span className="text-xs text-gray-300 ml-5">Deliver to</span>
          <div className="flex items-center gap-1">
            <MapPin size={16} />
            <span className="text-sm font-bold">India</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex items-center h-10">
          <select className="bg-gray-100 text-amazon-text h-full px-2 rounded-l-md text-xs border-r border-gray-300 outline-none focus:ring-2 focus:ring-amazon-orange z-10">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Refurbished</option>
          </select>
          <input 
            type="text" 
            className="flex-1 h-full px-3 text-amazon-text outline-none focus:ring-2 focus:ring-amazon-orange"
            placeholder="Search SecondLife Commerce"
          />
          <button className="bg-amazon-orange hover:bg-[#F3A847] p-2 rounded-r-md h-full px-4 text-amazon-dark">
            <Search size={20} />
          </button>
        </div>

        {/* Account & Lists */}
        <div className="hidden lg:flex flex-col px-2 border border-transparent hover:border-white rounded-sm cursor-pointer py-1">
          <span className="text-xs">Hello, Sign in</span>
          <span className="text-sm font-bold">Account & Lists</span>
        </div>

        {/* Green Points Wallet */}
        <div className="flex flex-col px-2 border border-transparent hover:border-white rounded-sm cursor-pointer py-1">
          <span className="text-xs text-amazon-orange">Impact Score</span>
          <div className="flex items-center gap-1">
            <Leaf size={16} className="text-amazon-green" />
            <span className="text-sm font-bold text-amazon-orange">{points} pts</span>
          </div>
        </div>

        {/* Cart */}
        <div className="flex items-end gap-1 px-2 border border-transparent hover:border-white rounded-sm cursor-pointer py-1">
          <div className="relative">
            <ShoppingCart size={28} />
            <span className="absolute -top-1 left-4 bg-amazon-orange text-amazon-dark rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">0</span>
          </div>
          <span className="text-sm font-bold mb-1">Cart</span>
        </div>
      </div>

      {/* Sub Header / Nav Links */}
      <div className="bg-amazon-light text-white px-4 py-1 flex items-center gap-4 text-sm font-medium overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-1 border border-transparent hover:border-white rounded-sm px-2 py-1 cursor-pointer">
          <span className="font-bold">All</span>
        </div>
        <span className="border border-transparent hover:border-white rounded-sm px-2 py-1 cursor-pointer">Sell Your Product</span>
        <span className="border border-transparent hover:border-white rounded-sm px-2 py-1 cursor-pointer">Refurbished Deals</span>
        <span className="border border-transparent hover:border-white rounded-sm px-2 py-1 cursor-pointer">Impact Dashboard</span>
        <span className="border border-transparent hover:border-white rounded-sm px-2 py-1 cursor-pointer">Donation Centers</span>
        <span className="hidden md:inline border border-transparent hover:border-white rounded-sm px-2 py-1 cursor-pointer">Customer Service</span>
      </div>
    </header>
  );
};

export default Header;
