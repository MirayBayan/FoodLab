export default function TestItem({ test, onDelete }) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow">
      <p className="font-semibold text-gray-800 mb-2 text-lg">
        🧪 {test.sampleName}
      </p>

      {test.analyses.map((a, i) => (
        <p key={i} className="text-sm text-gray-600">
          {a.type}: %{a.result}
        </p>
      ))}

      <button onClick={() => onDelete(test.id)} className="text-red-400 mt-2">
        Sil
      </button>
    </div>
  );
}
