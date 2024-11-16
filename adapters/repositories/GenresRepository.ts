import { TYPES } from "../../types";
import type { ILogger } from "@usecases/Logging";
import type { IMetrics } from "@usecases/SimpleMetrics";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { promises as fs } from "fs";
import path from "path";

type GenreLocale = {
  [key: string]: {
    name: string;
    description: string;
  };
};

export const GENRES: { [key: string]: GenreLocale } = {
  fiction: {
    vi: {
      name: "Tiểu thuyết",
      description: "Truyện kể và cốt truyện tưởng tượng",
    },
    en: {
      name: "Fiction",
      description: "Imaginary storytelling and narratives",
    },
  },
  nonFiction: {
    vi: {
      name: "Phi tiểu thuyết",
      description: "Dựa trên sự kiện và sự thật thực tế",
    },
    en: {
      name: "Non-Fiction",
      description: "Based on real events and facts",
    },
  },
  scienceFiction: {
    vi: {
      name: "Khoa học viễn tưởng",
      description: "Truyện kể dựa trên khoa học và tương lai",
    },
    en: {
      name: "Science Fiction",
      description: "Futuristic and scientific-based storytelling",
    },
  },
  fantasy: {
    vi: {
      name: "Giả tưởng",
      description: "Yếu tố ma thuật và siêu nhiên trong các câu chuyện",
    },
    en: {
      name: "Fantasy",
      description: "Magical and supernatural elements in narratives",
    },
  },
  mystery: {
    vi: {
      name: "Trinh thám",
      description: "Giải quyết tội ác hoặc khám phá bí mật",
    },
    en: {
      name: "Mystery",
      description: "Solving crimes or uncovering secrets",
    },
  },
  thriller: {
    vi: {
      name: "Kinh dị hồi hộp",
      description: "Cốt truyện nhanh, hồi hộp và đầy kịch tính",
    },
    en: {
      name: "Thriller",
      description: "Fast-paced, suspenseful and exciting plots",
    },
  },
  romance: {
    vi: {
      name: "Lãng mạn",
      description: "Câu chuyện tập trung vào tình yêu và mối quan hệ",
    },
    en: {
      name: "Romance",
      description: "Love and relationship-focused stories",
    },
  },
  horror: {
    vi: {
      name: "Kinh dị",
      description: "Nhằm làm sợ hoặc làm người đọc khó chịu",
    },
    en: {
      name: "Horror",
      description: "Intended to scare or unsettle readers",
    },
  },
  biography: {
    vi: {
      name: "Tiểu sử",
      description: "Câu chuyện cuộc đời của một người thật",
    },
    en: {
      name: "Biography",
      description: "Life story of a real person",
    },
  },
  memoir: {
    vi: {
      name: "Hồi ký",
      description: "Kỷ niệm và trải nghiệm cá nhân",
    },
    en: {
      name: "Memoir",
      description: "Personal memories and experiences",
    },
  },
  selfHelp: {
    vi: {
      name: "Tự lực",
      description: "Hướng dẫn cải thiện bản thân",
    },
    en: {
      name: "Self-Help",
      description: "Guidance for personal improvement",
    },
  },
  cookbook: {
    vi: {
      name: "Sách nấu ăn",
      description: "Công thức và hướng dẫn nấu ăn",
    },
    en: {
      name: "Cookbook",
      description: "Recipes and cooking instructions",
    },
  },
  art: {
    vi: {
      name: "Nghệ thuật",
      description: "Nghệ thuật thị giác và sự thể hiện sáng tạo",
    },
    en: {
      name: "Art",
      description: "Visual arts and creative expression",
    },
  },
  history: {
    vi: {
      name: "Lịch sử",
      description: "Các sự kiện trong quá khứ",
    },
    en: {
      name: "History",
      description: "Events from the past",
    },
  },
  travel: {
    vi: {
      name: "Du lịch",
      description: "Khám phá địa điểm và văn hóa",
    },
    en: {
      name: "Travel",
      description: "Exploring places and cultures",
    },
  },
  childrens: {
    vi: {
      name: "Truyện thiếu nhi",
      description: "Câu chuyện cho độc giả trẻ",
    },
    en: {
      name: "Children's",
      description: "Stories for young readers",
    },
  },
  youngAdult: {
    vi: {
      name: "Thanh thiếu niên",
      description: "Hướng tới độc giả tuổi teen",
    },
    en: {
      name: "Young Adult",
      description: "Targeted at teenage readers",
    },
  },
  poetry: {
    vi: {
      name: "Thơ",
      description: "Thơ biểu cảm và nhịp nhàng",
    },
    en: {
      name: "Poetry",
      description: "Expressive and rhythmic verse",
    },
  },
  graphicNovel: {
    vi: {
      name: "Tiểu thuyết đồ họa",
      description: "Truyện kể có minh họa",
    },
    en: {
      name: "Graphic Novel",
      description: "Narrative storytelling with illustrations",
    },
  },
  comicBook: {
    vi: {
      name: "Truyện tranh",
      description: "Nghệ thuật tuần tự và cốt truyện ngắn",
    },
    en: {
      name: "Comic Book",
      description: "Sequential art and short narratives",
    },
  },
  manga: {
    vi: {
      name: "Manga",
      description: "Truyện tranh và tiểu thuyết đồ họa kiểu Nhật",
    },
    en: {
      name: "Manga",
      description: "Japanese style comics and graphic novels",
    },
  },
  dystopian: {
    vi: {
      name: "Utopia",
      description: "Xã hội tưởng tượng với hệ thống áp bức",
    },
    en: {
      name: "Dystopian",
      description: "Imagined societies with oppressive systems",
    },
  },
  adventure: {
    vi: {
      name: "Phiêu lưu",
      description: "Những chuyến đi thú vị và đầy hành động",
    },
    en: {
      name: "Adventure",
      description: "Exciting and action-packed journeys",
    },
  },
  western: {
    vi: {
      name: "Tây phương",
      description: "Câu chuyện diễn ra ở miền Tây nước Mỹ",
    },
    en: {
      name: "Western",
      description: "Stories set in the American West",
    },
  },
  historicalFiction: {
    vi: {
      name: "Tiểu thuyết lịch sử",
      description: "Câu chuyện hư cấu đặt trong bối cảnh lịch sử",
    },
    en: {
      name: "Historical Fiction",
      description: "Fictional stories set in historical contexts",
    },
  },
  literaryFiction: {
    vi: {
      name: "Tiểu thuyết văn học",
      description: "Nhấn mạnh phong cách và phát triển nhân vật",
    },
    en: {
      name: "Literary Fiction",
      description: "Emphasis on style and character development",
    },
  },
  shortStories: {
    vi: {
      name: "Truyện ngắn",
      description: "Những câu chuyện hư cấu ngắn gọn",
    },
    en: {
      name: "Short Stories",
      description: "Brief fictional narratives",
    },
  },
  plays: {
    vi: {
      name: "Kịch",
      description: "Biểu diễn kịch bản cho sân khấu",
    },
    en: {
      name: "Plays",
      description: "Scripted performances for theater",
    },
  },
  essays: {
    vi: {
      name: "Bài luận",
      description: "Những bài viết phân tích hoặc phản ánh ngắn",
    },
    en: {
      name: "Essays",
      description: "Short analytical or reflective pieces",
    },
  },
  anthology: {
    vi: {
      name: "Tập truyện",
      description: "Bộ sưu tập các tác phẩm văn học",
    },
    en: {
      name: "Anthology",
      description: "Collection of literary works",
    },
  },
  encyclopedia: {
    vi: {
      name: "Bách khoa toàn thư",
      description: "Tài liệu tham khảo toàn diện về kiến thức",
    },
    en: {
      name: "Encyclopedia",
      description: "Comprehensive reference of knowledge",
    },
  },
  dictionary: {
    vi: {
      name: "Từ điển",
      description: "Danh sách từ với định nghĩa",
    },
    en: {
      name: "Dictionary",
      description: "List of words with definitions",
    },
  },
  textbook: {
    vi: {
      name: "Sách giáo khoa",
      description: "Tài liệu giáo dục cho việc học",
    },
    en: {
      name: "Textbook",
      description: "Educational material for study",
    },
  },
  reference: {
    vi: {
      name: "Tài liệu tham khảo",
      description: "Vật liệu dùng để tra cứu thông tin",
    },
    en: {
      name: "Reference",
      description: "Materials used for information lookup",
    },
  },
  guide: {
    vi: {
      name: "Hướng dẫn",
      description: "Tài liệu hướng dẫn và thông tin",
    },
    en: {
      name: "Guide",
      description: "Instructional and informative material",
    },
  },
  journal: {
    vi: {
      name: "Nhật ký",
      description: "Ghi chép cá nhân hoặc học thuật về các sự kiện",
    },
    en: {
      name: "Journal",
      description: "Personal or academic record of events",
    },
  },
  magazine: {
    vi: {
      name: "Tạp chí",
      description: "Ấn phẩm định kỳ với các bài viết và đặc điểm",
    },
    en: {
      name: "Magazine",
      description: "Periodic publication with articles and features",
    },
  },
  newspaper: {
    vi: {
      name: "Báo",
      description: "Ấn phẩm tin tức hàng ngày hoặc hàng tuần",
    },
    en: {
      name: "Newspaper",
      description: "Daily or weekly news publication",
    },
  },
  periodical: {
    vi: {
      name: "Ấn phẩm định kỳ",
      description: "Tạp chí hoặc tạp chí khoa học được xuất bản đều đặn",
    },
    en: {
      name: "Periodical",
      description: "Regularly published magazine or journal",
    },
  },
  almanac: {
    vi: {
      name: "Almanac",
      description: "Ấn phẩm hàng năm với số liệu thống kê và sự kiện",
    },
    en: {
      name: "Almanac",
      description: "Annual publication with statistics and facts",
    },
  },
  atlas: {
    vi: {
      name: "Bản đồ",
      description: "Bộ sưu tập bản đồ và dữ liệu địa lý",
    },
    en: {
      name: "Atlas",
      description: "Collection of maps and geographical data",
    },
  },
  gazetteer: {
    vi: {
      name: "Gazetteer",
      description: "Chỉ mục hoặc danh mục địa lý",
    },
    en: {
      name: "Gazetteer",
      description: "Geographical index or directory",
    },
  },
  directory: {
    vi: {
      name: "Danh bạ",
      description: "Danh sách liên hệ hoặc thông tin",
    },
    en: {
      name: "Directory",
      description: "Listing of contacts or information",
    },
  },
  yearbook: {
    vi: {
      name: "Sách niên giám",
      description: "Ghi chép hàng năm về sự kiện hoặc thành tựu",
    },
    en: {
      name: "Yearbook",
      description: "Annual record of events or achievements",
    },
  },
  calendar: {
    vi: {
      name: "Lịch",
      description: "Hệ thống tổ chức các ngày cho sự kiện",
    },
    en: {
      name: "Calendar",
      description: "System organizing days for events",
    },
  },
  catalog: {
    vi: {
      name: "Danh mục",
      description: "Danh sách hệ thống các mặt hàng hoặc sản phẩm",
    },
    en: {
      name: "Catalog",
      description: "Systematic list of items or products",
    },
  },
  manual: {
    vi: {
      name: "Sách hướng dẫn",
      description: "Hướng dẫn sử dụng",
    },
    en: {
      name: "Manual",
      description: "Instructional guide for use",
    },
  },
  handbook: {
    vi: {
      name: "Sổ tay",
      description: "Sách tham khảo ngắn gọn",
    },
    en: {
      name: "Handbook",
      description: "Concise reference book",
    },
  },
  workbook: {
    vi: {
      name: "Sách bài tập",
      description: "Bài tập luyện tập cho việc học",
    },
    en: {
      name: "Workbook",
      description: "Practice exercises for learning",
    },
  },
  guidebook: {
    vi: {
      name: "Sách hướng dẫn du lịch",
      description: "Hành động từng bước",
    },
    en: {
      name: "Guidebook",
      description: "Step-by-step action",
    },
  },
};

@injectable()
export default class GenresRepository {
  constructor(
    @inject(TYPES.LOGGER) private logger: ILogger,
    @inject(TYPES.METRICS) private metrics: IMetrics
  ) {}

  async loadGenresCount() {
    const dataPath = path.join(
      process.cwd(),
      "data",
      "genres",
      "genre-books.json"
    );
    const data = await fs.readFile(dataPath, "utf-8");
    const genres = JSON.parse(data) as { [key: string]: { count: number } };
    const gCount = Object.keys(genres).reduce((acc, genre) => {
      acc[genre] = genres[genre].count;
      return acc;
    }, {} as { [key: string]: number });

    return gCount;
  }

  async getGenres(locale: string) {
    const endTimer = this.metrics.startTimer("getGenres");
    try {
      const genresWithCount = await this.loadGenresCount();
      const genres = Object.keys(GENRES).map((genre: string) => {
        return {
          id: genre,
          genre: GENRES[genre][locale].name,
          description: GENRES[genre][locale].description,
          count: genresWithCount[genre],
        };
      });

      return genres;
    } catch (err) {
      this.logger.error((err as Error).message);
      return [];
    } finally {
      endTimer();
    }
  }
}
