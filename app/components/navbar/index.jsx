import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../../../context/authContext';
import { ContractContext } from '../../../context/contractContext';

const Navbar = ({name}) => {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const contractContext = useContext(ContractContext);
  const { handleLogout } = authContext || { handleLogout: () => null };
  const { checkIsUser, isRegist, getUserData, userData } = contractContext;
  const { address } = authContext;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    checkIsUser();
    getUserData();
  }, [isRegist]);

  const handleProfile = () => {
    if(isRegist === true) {
      router.push('/profil');
    } else {
      router.push('/registrasi');
    }
  }

  return (
    <nav className="bg-transparent p-4 flex justify-between items-center">
      <div className="text-white font-bold cursor-pointer" onClick={() => router.push('/')}>Nyumbangin</div>
      <div className="relative">
        <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
          <img
            src={userData.ava || 'https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?w=740&t=st=1698473813~exp=1698474413~hmac=f9832cbc1ff89bbd091138aa52748c22c0819549ac495c31efa766e8c9d25982'}
            alt="Profile"
            className="w-8 h-8 rounded-full mr-2 object-cover"
          />
          <span className="text-white truncate max-w-[150px]">{address?.replace(/^"(.+(?="$))"$/, '$1')}</span>
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 p-4 bg-[#3F3F3F] shadow-md rounded space-y-4 w-[200px]">
            <div className="text-white cursor-pointer hover:opacity-75" onClick={handleProfile}>
              Profil
            </div>
            <div className="text-red-500 cursor-pointer hover:opacity-75" onClick={handleLogout}>
              Keluar
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
