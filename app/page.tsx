'use client'
import React from 'react'
import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [activeTab, setActiveTab] = useState('shopping')

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Omega Jasa Titip</title>
        <meta name="description" content="Layanan Jasa Titip dan Pengantaran" />
      </Head>

      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Omega Jasa Titip</h1>
        <p className="text-sm">Layanan Jasa Titip dan Pengantaran</p>
      </header>

      <main className="container mx-auto p-4">
        <div className="flex border-b mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'shopping' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
            onClick={() => setActiveTab('shopping')}
          >
            Belanja
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'delivery' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
            onClick={() => setActiveTab('delivery')}
          >
            Pengantaran
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'transport' ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
            onClick={() => setActiveTab('transport')}
          >
            Transportasi
          </button>
        </div>

        {activeTab === 'shopping' && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Layanan Belanja</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-1">Nama Barang</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block mb-1">Kuantitas</label>
                <input type="number" className="w-full p-2 border rounded" />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Pesan Sekarang
              </button>
            </form>
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Layanan Pengantaran</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-1">Alamat Penjemputan</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block mb-1">Alamat Pengantaran</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Pesan Sekarang
              </button>
            </form>
          </div>
        )}

        {activeTab === 'transport' && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Layanan Transportasi</h2>
            <form className="space-y-4">
              <div>
                <label className="block mb-1">Lokasi Penjemputan</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block mb-1">Tujuan</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Pesan Sekarang
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  )
}
