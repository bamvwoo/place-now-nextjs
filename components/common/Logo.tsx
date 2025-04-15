import Image from "next/image";

export default function Logo() {
    return (
        <>
            <Image 
                src="/images/logo-dark.svg"
                alt="Logo"
                width={35}
                height={35} />
        </>
    );
};