'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Wand2, TrendingUp, Heart } from 'lucide-react';

interface AIWritingAssistantProps {
  onContentGenerate: (content: string) => void;
}

export function AIWritingAssistant({
  onContentGenerate,
}: AIWritingAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const contentTemplates = [
    {
      icon: <TrendingUp className="w-4 h-4" />,
      title: 'Bài viết xu hướng',
      description: 'Tạo nội dung theo xu hướng hiện tại',
      template:
        '🔥 Xu hướng hot nhất hiện nay! {topic} đang được mọi người quan tâm. Bạn đã biết chưa? #trending #hot',
    },
    {
      icon: <Heart className="w-4 h-4" />,
      title: 'Nội dung cảm xúc',
      description: 'Tạo bài viết gây cảm xúc',
      template:
        '💝 {topic} - điều tuyệt vời mà chúng ta nên trân trọng mỗi ngày. Hãy cùng chia sẻ những khoảnh khắc đáng nhớ! ✨',
    },
    {
      icon: <Wand2 className="w-4 h-4" />,
      title: 'Câu hỏi tương tác',
      description: 'Tạo câu hỏi để tăng tương tác',
      template:
        '🤔 Câu hỏi của ngày hôm nay: Bạn nghĩ gì về {topic}? Hãy chia sẻ ý kiến của bạn trong bình luận nhé! 👇',
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      title: 'Mẹo hữu ích',
      description: 'Chia sẻ mẹo và kinh nghiệm',
      template:
        '💡 Mẹo hay về {topic} mà bạn nên biết:\n\n✅ Tip 1: [Điền nội dung]\n✅ Tip 2: [Điền nội dung]\n✅ Tip 3: [Điền nội dung]\n\nLưu lại để áp dụng nhé! 📌',
    },
  ];

  const handleGenerate = (template: string) => {
    if (!topic.trim()) {
      alert('Vui lòng nhập chủ đề!');
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation delay
    setTimeout(() => {
      const generatedContent = template.replace('{topic}', topic);
      onContentGenerate(generatedContent);
      setIsGenerating(false);
      setIsOpen(false);
      setTopic('');
    }, 1000);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="hover:bg-purple-50">
          <Sparkles className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold">AI Writing Assistant</h3>
              <p className="text-xs text-gray-500">Tạo nội dung với AI</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="topic" className="text-sm font-medium">
                Chủ đề
              </Label>
              <Input
                id="topic"
                placeholder="Nhập chủ đề bạn muốn viết..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Chọn mẫu nội dung</Label>
              {contentTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => handleGenerate(template.template)}
                  disabled={isGenerating}
                  className="w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                      {template.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{template.title}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        {template.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {isGenerating && (
              <div className="text-center py-4">
                <div className="inline-flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-gray-600">
                    Đang tạo nội dung...
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
