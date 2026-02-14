import { BookOpen } from 'lucide-react';

const Classes = () => {
  return (
    <div className="page-container">
      <div className="page-header">
        <BookOpen size={32} className="page-icon" />
        <div>
          <h1 className="page-heading">Classes</h1>
          <p className="page-description">Manage all your classes and courses</p>
        </div>
      </div>

      <div className="placeholder-content">
        <p>Classes management interface coming soon...</p>
      </div>

      <style>{`
        .page-container {
          background: #ffffff;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(0, 0, 0, 0.06);
        }

        .page-header {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding-bottom: 2rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.06);
          margin-bottom: 2rem;
        }

        .page-icon {
          width: 56px;
          height: 56px;
          padding: 12px;
          background: linear-gradient(135deg, var(--primary-500) 0%, var(--accent-1) 100%);
          color: #ffffff;
          border-radius: 16px;
          flex-shrink: 0;
        }

        .page-heading {
          margin: 0;
          font-size: 2rem;
          font-weight: 700;
          color: #1e293b;
          letter-spacing: -0.02em;
        }

        .page-description {
          margin: 0.25rem 0 0 0;
          font-size: 0.9375rem;
          color: #64748b;
        }

        .placeholder-content {
          padding: 4rem 2rem;
          text-align: center;
          color: #64748b;
          font-size: 1rem;
        }

        @media (max-width: 640px) {
          .page-container {
            padding: 1.5rem;
          }

          .page-heading {
            font-size: 1.5rem;
          }

          .page-icon {
            width: 48px;
            height: 48px;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Classes;