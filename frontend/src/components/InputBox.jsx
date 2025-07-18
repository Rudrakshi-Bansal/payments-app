export default function InputBox({label, placeholder, type="text", onChange}) {
    return <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input placeholder={placeholder} onChange={onChange} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}