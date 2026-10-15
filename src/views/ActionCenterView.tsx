import React, { useState } from 'react';
import {
  CheckSquare,
  ShieldCheck,
  Clock,
  CheckCircle2,
  XCircle,
  FileCode2,
  History,
  Send,
  Plus,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ActionPlanItem, ActionStatus } from '../types';

interface ActionCenterViewProps {
  actions: ActionPlanItem[];
  onUpdateActionStatus: (id: string, newStatus: ActionStatus, note?: string) => void;
  onAddNewAction: (action: ActionPlanItem) => void;
}

export const ActionCenterView: React.FC<ActionCenterViewProps> = ({
  actions,
  onUpdateActionStatus,
  onAddNewAction
}) => {
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('All');
  const [selectedActionId, setSelectedActionId] = useState<string>(actions[0]?.id || '');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<any>('Content');
  const [newImpact, setNewImpact] = useState('+15% Recommendation Win Rate');
  const [newSuggestion, setNewSuggestion] = useState('');

  const filtered = actions.filter(a => {
    if (selectedStatusTab !== 'All' && a.status !== selectedStatusTab) return false;
    return true;
  });

  const selectedAction = actions.find(a => a.id === selectedActionId) || actions[0];

  const handleCreateNew = () => {
    if (!newTitle.trim()) return;
    const item: ActionPlanItem = {
      id: `act-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      priority: 'High',
      difficulty: 'Medium',
      expectedImpact: newImpact,
      status: 'Draft',
      owner: 'Marketing Team',
      aiSuggestion: newSuggestion || 'Address identified gap in AI search citations.',
      createdAt: new Date().toISOString().split('T')[0],
      history: [
        {
          timestamp: new Date().toLocaleString(),
          action: 'Manually drafted',
          user: 'Current User'
        }
      ]
    };
    onAddNewAction(item);
    setShowNewModal(false);
    setNewTitle('');
    setNewSuggestion('');
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">
                LUMENIQ Action Center (Human-in-the-Loop)
              </h2>
              <p className="text-xs text-slate-400">
                Governance & execution: Review, approve, and verify AI search optimization tasks with an immutable audit trail.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-blue-500/20 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Task</span>
        </button>
      </div>

      {/* Tabs by Status */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['All', 'Draft', 'Review', 'Approved', 'Executing', 'Published'].map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatusTab(st)}
            className={`px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
              selectedStatusTab === st
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {st} ({st === 'All' ? actions.length : actions.filter(a => a.status === st).length})
          </button>
        ))}
      </div>

      {/* Master-Detail Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Task List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.map((act, idx) => {
            const isSelected = selectedAction?.id === act.id;
            return (
              <div
                key={act.id}
                onClick={() => setSelectedActionId(act.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer
                            animate-fade-in-up stagger-${Math.min(idx + 1, 6)}
                  ${isSelected
                    ? 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-500/15 glow-blue'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 card-hover'
                  }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <span className="text-xs font-bold text-white line-clamp-1">{act.title}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shrink-0
                    ${
                      act.status === 'Draft'     ? 'badge-draft' :
                      act.status === 'Review'    ? 'badge-review' :
                      act.status === 'Approved'  ? 'badge-approved' :
                      act.status === 'Executing' ? 'badge-executing' :
                      act.status === 'Published' ? 'badge-published' :
                      act.status === 'Rejected'  ? 'badge-rejected' :
                      'badge-draft'
                    }`}
                  >
                    {act.status}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-2 mb-3">
                  {act.aiSuggestion}
                </p>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800">
                  <span className="text-cyan-400 font-bold">{act.expectedImpact}</span>
                  <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">{act.category}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Selected Task Inspector & Approval Actions (7 cols) */}
        {selectedAction && (
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                  {selectedAction.category} • Task #{selectedAction.id}
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {selectedAction.title}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-xl text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 self-start">
                Status: {selectedAction.status}
              </span>
            </div>

            {/* AI Recommendation */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
              <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                AI Optimization Proposal:
              </span>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {selectedAction.aiSuggestion}
              </p>
              <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-2">
                <span>Impact: <strong className="text-emerald-400">{selectedAction.expectedImpact}</strong></span>
                <span>Difficulty: <strong className="text-slate-200">{selectedAction.difficulty}</strong></span>
                <span>Owner: <strong className="text-slate-200">{selectedAction.owner}</strong></span>
              </div>
            </div>

            {/* Code / Content Snippet */}
            {selectedAction.proposedCodeOrBrief && (
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
                  Proposed Code / Content Specification:
                </span>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-cyan-300 font-mono overflow-x-auto whitespace-pre-wrap max-h-48">
                  {selectedAction.proposedCodeOrBrief}
                </pre>
              </div>
            )}

            {/* Human Approval Button Actions */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-slate-950 via-slate-950 to-blue-950/40 border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Human Approval Action Gate
              </span>
              <p className="text-[11px] text-slate-400">
                To guarantee brand safety and prevent unintended crawler indexing, changes must be reviewed and approved by your team.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {selectedAction.status === 'Draft' && (
                  <button
                    onClick={() => onUpdateActionStatus(selectedAction.id, 'Review', 'Submitted for peer review')}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-all"
                  >
                    Submit for Review
                  </button>
                )}

                {selectedAction.status !== 'Approved' && selectedAction.status !== 'Published' && (
                  <button
                    onClick={() => onUpdateActionStatus(selectedAction.id, 'Approved', 'Approved by Team Lead')}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Task</span>
                  </button>
                )}

                {selectedAction.status === 'Approved' && (
                  <button
                    onClick={() => onUpdateActionStatus(selectedAction.id, 'Executing', 'Moved to Execution in CI/CD pipeline')}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all"
                  >
                    Deploy to Staging / Execution
                  </button>
                )}

                {selectedAction.status === 'Executing' && (
                  <button
                    onClick={() => onUpdateActionStatus(selectedAction.id, 'Published', 'Verified live on production website')}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all"
                  >
                    Mark as Published & Verify
                  </button>
                )}

                <button
                  onClick={() => onUpdateActionStatus(selectedAction.id, 'Rejected', 'Rejected during review')}
                  className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-bold transition-all"
                >
                  Reject Task
                </button>
              </div>
            </div>

            {/* Audit Trail History */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <History className="w-3.5 h-3.5 text-slate-400" />
                Immutable Audit Trail:
              </span>
              <div className="space-y-1 text-[11px] text-slate-400">
                {selectedAction.history.map((hist, hIdx) => (
                  <div key={hIdx} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/40">
                    <span>
                      <strong className="text-slate-300">{hist.user}:</strong> {hist.action}
                    </span>
                    <span className="font-mono text-[10px] text-slate-500">{hist.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* New Task Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-white">Create Optimization Task</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Task Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Deploy Comparison Hub vs Competitor"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                >
                  <option value="Content">Content Optimization</option>
                  <option value="Technical AEO">Technical AEO / Schema</option>
                  <option value="Authority / Citations">Authority / Citations</option>
                  <option value="Brand Accuracy">Brand Accuracy</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Expected Impact</label>
                <input
                  type="text"
                  value={newImpact}
                  onChange={(e) => setNewImpact(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="text-slate-400 font-semibold block mb-1">Description / AI Suggestion</label>
                <textarea
                  value={newSuggestion}
                  onChange={(e) => setNewSuggestion(e.target.value)}
                  rows={3}
                  placeholder="Outline the specific changes needed..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none"
                />
              </div>
            </div>
            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateNew}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
