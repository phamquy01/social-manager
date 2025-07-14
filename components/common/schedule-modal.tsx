'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';

interface ScheduleModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ScheduleModal({ open, onOpenChange }: ScheduleModalProps) {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState('');
  const [timezone, setTimezone] = useState('Asia/Ho_Chi_Minh');

  const handleSchedule = () => {
    // Logic để lập lịch bài đăng
    console.log('Lập lịch:', { selectedDate, selectedTime, timezone });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Lập lịch đăng bài</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Chọn ngày</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal mt-2 bg-transparent"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? (
                    selectedDate.toLocaleDateString('vi-VN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  ) : (
                    <span>Chọn ngày</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="time">Chọn giờ</Label>
            <Input
              id="time"
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="mt-2"
            />
          </div>

          <div>
            <Label>Múi giờ</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Asia/Ho_Chi_Minh">
                  Việt Nam (GMT+7)
                </SelectItem>
                <SelectItem value="America/New_York">
                  New York (GMT-5)
                </SelectItem>
                <SelectItem value="Europe/London">London (GMT+0)</SelectItem>
                <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Hủy
          </Button>
          <Button
            onClick={handleSchedule}
            disabled={!selectedDate || !selectedTime}
          >
            Lập lịch
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
