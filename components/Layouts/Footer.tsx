const Footer = () => {
    return (
        <div className="mt-auto p-6 text-center dark:text-white-dark ltr:sm:text-left rtl:sm:text-right">
            © {new Date().getFullYear()}. Vristo All rights reserved.
        </div>
    );
};

export default Footer;
