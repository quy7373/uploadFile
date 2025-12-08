import { Upload, Loader2, TrendingUp } from "lucide-react";

interface Props {
  file: File | null;
  setFile: (file: File | null) => void;
  jobDescription: string;
  setJobDescription: (value: string) => void;
  loading: boolean;
  handleAnalyze: () => void;
  error: string | null;
}

export default function UploadSection({
  file,
  setFile,
  jobDescription,
  setJobDescription,
  loading,
  handleAnalyze,
  error,
}: Props) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Upload size={24} />
        Upload CV
      </h2>

      <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />

      <textarea
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Mô tả công việc (tuỳ chọn)"
        className="w-full mt-3 border rounded p-2"
      />

      <button
        onClick={handleAnalyze}
        disabled={loading || !file}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin inline mr-2" /> Đang phân tích
          </>
        ) : (
          <>
            <TrendingUp className="inline mr-2" /> Phân tích CV
          </>
        )}
      </button>

      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}
