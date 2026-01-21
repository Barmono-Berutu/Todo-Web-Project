export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()}{" "}
        <span className="font-medium text-gray-200">barmono-berutu</span>. All
        rights reserved.
      </div>
    </footer>
  );
}
