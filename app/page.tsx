import Link from "next/link";
import { CheckCircle2, ListTodo, Zap, Shield } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Atur Hidupmu,{" "}
            <span className="text-gray-700 font-semibold">
              Satu Tugas di Satu Waktu
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Cara paling sederhana dan elegan untuk mengelola tugas harianmu.
            Tetap produktif, tetap fokus, tetap terorganisir.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-800 text-white rounded-lg text-lg hover:shadow-lg transition transform hover:scale-105"
          >
            Mulai Kelola Tugas
            <Zap className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-20">
          <div className="bg-gray-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Sederhana & Intuitif
            </h3>
            <p className="text-gray-600">
              Antarmuka bersih yang membuatmu fokus pada hal yang penting.
            </p>
          </div>

          <div className="bg-gray-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Sangat Cepat
            </h3>
            <p className="text-gray-600">
              Tambah, selesaikan, dan kelola tugas dalam hitungan detik.
            </p>
          </div>

          <div className="bg-gray-200 p-8 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 bg-gray-300 rounded-lg flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-gray-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Aman & Privat
            </h3>
            <p className="text-gray-600">
              Tugasmu adalah milikmu sendiri. Kami memprioritaskan privasi dan
              keamanan datamu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
