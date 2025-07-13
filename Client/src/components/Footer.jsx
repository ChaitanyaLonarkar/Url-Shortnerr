
const Footer = () => {
  return (
    <footer className="text-[#482307] py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} URL Shortener. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          Made with ❤️ by <a href="https://github.com/ChaitanyaLonarkar" className="font-bold animate-pulse ">Chaitanya</a>
        </p>
      </div>
    </footer>
  );
}
export default Footer;