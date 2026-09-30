import { X, Mail } from 'lucide-react';

interface MessagesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MessagesModal: React.FC<MessagesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const messages = [
    {
      id: 'm1',
      sender: 'Grid Control Operations Center',
      time: '10 mins ago',
      title: 'Scheduled Transformer Maintenance - Substation Gamma',
      text: 'Routine maintenance scheduled for Transformer T-2 on Sunday at 02:00 AM IST. Automatic feeder bypass enabled.',
      unread: true
    },
    {
      id: 'm2',
      sender: 'State Load Dispatcher',
      time: '1 hour ago',
      title: 'Peak Load Incentive Active',
      text: 'Industrial consumers offered 5% tariff rebate for voluntary load shifting during evening peak hours (20:00 - 22:00).',
      unread: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-5 text-slate-100">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">System Operations Messages</h3>
              <p className="text-xs text-slate-400">Dispatcher broadcasts & grid communications</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 max-h-80 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-4 rounded-2xl border transition-all ${
                msg.unread
                  ? 'bg-gradient-to-r from-blue-950/40 to-slate-900 border-blue-500/40'
                  : 'bg-slate-950/60 border-slate-800'
              }`}
            >
              <div className="flex justify-between items-center text-xs text-slate-400 font-mono mb-1">
                <span className="font-bold text-blue-400">{msg.sender}</span>
                <span>{msg.time}</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">{msg.title}</h4>
              <p className="text-xs text-slate-300 leading-relaxed">{msg.text}</p>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-lg shadow-blue-600/20"
        >
          Close Inbox
        </button>
      </div>
    </div>
  );
};
