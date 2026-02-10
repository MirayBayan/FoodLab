import { useState } from 'react';
import TestItem from '../components/TestItem';

export default function Home() {
  const [tests, setTests] = useState([]);

  const [form, setForm] = useState({
    sampleName: '',
    testType: 'Nem',
    emptyWeight: '',
    sampleWeight: '',
    finalWeight: '',
    result: '',
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculate = () => {
    const empty = Number(form.emptyWeight.replace(',', '.'));
    const first = Number(form.sampleWeight.replace(',', '.'));
    const last = Number(form.finalWeight.replace(',', '.'));

    if (!empty || !first || !last) return;

    const netFirst = first - empty;
    const netLast = last - empty;

    let r = 0;

    if (form.testType === 'Nem') {
      r = ((netFirst - netLast) / netFirst) * 100;
    }

    if (form.testType === 'Kül') {
      r = (netLast / netFirst) * 100;
    }
    if (form.testType === 'Yağ') {
      r = ((netFirst - netLast) / netFirst) * 100;
    }
    setForm({ ...form, result: r.toFixed(2) });
  };

  const addTest = () => {
    if (!form.sampleName || !form.result) return;

    const name = form.sampleName.trim().toLowerCase();

    const existing = tests.find(t => t.sampleName.toLowerCase() === name);

    if (existing) {
      existing.analyses.push({
        type: form.testType,
        result: form.result,
        emptyWeight: form.emptyWeight,
      });

      setTests([...tests]);
    } else {
      setTests([
        ...tests,
        {
          id: Date.now(),
          sampleName: form.sampleName,
          analyses: [
            {
              type: form.testType,
              result: form.result,
              emptyWeight: form.emptyWeight,
            },
          ],
        },
      ]);
    }

    setForm({
      sampleName: '',
      testType: 'Nem',
      emptyWeight: '',
      sampleWeight: '',
      finalWeight: '',
      result: '',
    });
  };

  const deleteTest = id => {
    setTests(tests.filter(t => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[480px]">
        <h1 className="text-2xl font-semibold text-purple-600 text-center mb-2">
          🧪 FoodLab
        </h1>

        <p className="text-center text-gray-400 mb-4 text-sm">
          Gıda Analiz Takip Sistemi
        </p>

        <input
          name="sampleName"
          value={form.sampleName}
          onChange={handleChange}
          placeholder="Numune adı"
          className="border rounded-lg p-2 w-full mb-2"
        />

        <select
          name="testType"
          value={form.testType}
          onChange={handleChange}
          className="border p-2 w-full mb-2 rounded-lg"
        >
          <option>Nem</option>
          <option>Kül</option>
          <option>Yağ</option>
        </select>

        <input
          type="number"
          name="emptyWeight"
          value={form.emptyWeight}
          onChange={handleChange}
          placeholder="Boş kap ağırlığı (g)"
          className="border p-2 w-full mb-2 rounded-lg"
        />

        <input
          name="sampleWeight"
          value={form.sampleWeight}
          onChange={handleChange}
          placeholder="İlk tartım (g)"
          className="border p-2 w-full mb-2 rounded-lg"
        />

        <input
          name="finalWeight"
          value={form.finalWeight}
          onChange={handleChange}
          placeholder="Son tartım (g)"
          className="border p-2 w-full mb-3 rounded-lg"
        />

        <button
          onClick={calculate}
          className="bg-purple-500 hover:bg-purple-600 text-white w-full py-2 rounded-lg mb-2"
        >
          Hesapla
        </button>

        {form.result && (
          <div className="bg-purple-50 text-purple-600 text-center py-2 rounded-lg mb-2 font-semibold">
            Sonuç: %{form.result}
          </div>
        )}

        <p className="text-xs text-gray-400 text-center mb-3">
          Boş kap düşülerek hesaplanmıştır
        </p>

        <button
          onClick={addTest}
          className="bg-pink-400 hover:bg-pink-500 text-white w-full py-2 rounded-lg mb-4"
        >
          Kaydet
        </button>

        {tests.map(t => (
          <TestItem key={t.id} test={t} onDelete={deleteTest} />
        ))}
      </div>
    </div>
  );
}
