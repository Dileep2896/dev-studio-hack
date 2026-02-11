import type { Toast as ToastType } from '../hooks/useToast';

interface Props {
  toasts: ToastType[];
}

export default function ToastContainer({ toasts }: Props) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="px-5 py-3.5 rounded-xl text-[13px] shadow-2xl animate-slide-in"
          style={{
            background: '#111125ee',
            border: '1px solid #1e1e3a',
            color: '#e0e0f0',
            backdropFilter: 'blur(12px)',
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
