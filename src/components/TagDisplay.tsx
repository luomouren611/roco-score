import { AccountTag } from '../types';

interface TagDisplayProps {
  tags: AccountTag[];
}

const TagDisplay = ({ tags }: TagDisplayProps) => {
  if (tags.length === 0) return null;

  return (
    <div className="rk-card p-5 mb-4">
      <h3 className="text-white font-semibold text-sm mb-3">
        账号特征
      </h3>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={`${tag.label}-${index}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full 
              text-xs font-medium"
            style={{
              backgroundColor: `${tag.color}12`,
              color: tag.color,
              border: `1px solid ${tag.color}25`,
            }}
          >
            <span>{tag.icon}</span>
            <span>{tag.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagDisplay;
