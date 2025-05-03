import { useState } from "react"
import { Card } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { formatLabel } from "@/utils/format"

type DataDictionaryProps = {
  dataDictionary: Record<string, string>;
};

export function DataDictionaryCard({ dataDictionary }: DataDictionaryProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="p-4">
      <button
        className="flex items-center justify-between w-full text-left font-medium text-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>Data Dictionary</span>
        {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-2">
          {Object.entries(dataDictionary).map(([key, description]) => (
            <div key={key} className="border rounded p-2 bg-gray-50">
              <div className="font-semibold text-sm text-gray-800">{formatLabel(key)}</div>
              <div className="text-sm text-gray-600">{description}</div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}