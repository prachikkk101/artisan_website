import React, { useState } from 'react';

const ArtisanDashboard = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to handle Vision AI Upload
  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('http://localhost:8000/verify', {
      method: 'POST',
      body: formData,
    });
    const data = await response.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 p-8 font-sans">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-indigo-900">ArtisanConnect <span className="text-orange-600">AI</span></h1>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span> ML Engine Active
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* VISION AI SECTION */}
        <section className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-xl font-bold mb-4">Vision AI Authentication</h2>
          <p className="text-slate-500 mb-6 text-sm">Upload a product photo to verify handmade authenticity via our CNN model.</p>
          
          <div className="border-2 border-dashed border-indigo-100 rounded-2xl p-10 text-center mb-6">
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
            <button 
              onClick={handleUpload}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition"
            >
              {loading ? "Analyzing..." : "Run AI Verification"}
            </button>
          </div>

          {result && (
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <p className="text-green-800 font-bold">Status: {result.status}</p>
              <p className="text-green-600 text-sm">Confidence: {(result.authenticity_score * 100).toFixed(1)}%</p>
            </div>
          )}
        </section>

        {/* HYPERLOCAL SECTION */}
        <section className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
          <h2 className="text-xl font-bold mb-4">Hyperlocal Demand Map</h2>
          <div className="h-48 bg-slate-800 rounded-2xl mb-6 relative flex items-center justify-center overflow-hidden">
             {/* Simple visual for a map/heatmap */}
             <div className="absolute w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent"></div>
             <p className="text-slate-400 text-xs uppercase tracking-widest font-bold">Real-time Demand Heatmap</p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-slate-800 rounded-xl border border-slate-700">
              <div>
                <p className="font-bold">Terracotta Clays</p>
                <p className="text-xs text-slate-400">High Demand: Bengaluru</p>
              </div>
              <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs rounded-full border border-orange-500/50">Urgent Fill</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ArtisanDashboard;