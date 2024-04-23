import Image from "next/image";
import React from "react";

const SignInGoogleButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <>
      <div>
        <div
          onClick={onClick}
          className="hover:bg-gray1  flex items-center gap-2 border-2 px-4 py-2 rounded-lg cursor-pointer "
        >
          <Image
            src="/googlelogo.png"
            width={30}
            height={30}
            alt="google-logo"
          />
          <div className="cursor-pointer">Continue With Google</div>
        </div>
      </div>
    </>
  );
};

export default SignInGoogleButton;
