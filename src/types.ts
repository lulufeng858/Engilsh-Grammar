/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Difficulty = '初级' | '中级' | '高级';

export interface Explanation {
  correctAnswer: string;
  rule: string;
  example: string;
  commonMistake: string;
  reviewLink?: string;
}

export interface Question {
  id: string;
  sentenceBefore: string;
  sentenceAfter: string;
  options: string[];
  correctAnswer: string;
  difficulty: Difficulty;
  category: string;
  explanation: Explanation;
}

export const QUESTION_BANK: Question[] = [
  {
    id: '1',
    sentenceBefore: '',
    sentenceAfter: ' tired, she still finished the report.',
    options: ['Feeling', 'Felt', 'To feel', 'Feel'],
    correctAnswer: 'Feeling',
    difficulty: '中级',
    category: '非谓语动词',
    explanation: {
      correctAnswer: 'Feeling',
      rule: '现在分词作状语表示原因或伴随状态。主语 she 与 feel 是主动关系，故用 Feeling。',
      example: 'Feeling hungry, the boy went to the kitchen to find something to eat.',
      commonMistake: '误用 Felt。Felt 是过去分词，通常表示被动关系。',
      reviewLink: 'https://baike.baidu.com/item/现在分词'
    }
  },
  {
    id: '2',
    sentenceBefore: 'This is the school ',
    sentenceAfter: ' I studied three years ago.',
    options: ['where', 'which', 'that', 'when'],
    correctAnswer: 'where',
    difficulty: '初级',
    category: '定语从句',
    explanation: {
      correctAnswer: 'where',
      rule: '关系副词 where 在定语从句中作地点状语，修饰先行词 school。',
      example: 'The park where we met is very beautiful.',
      commonMistake: '误用 which。如果从句中谓语动词是及物动词且缺少宾语，才用 which。',
      reviewLink: 'https://baike.baidu.com/item/定语从句'
    }
  },
  {
    id: '3',
    sentenceBefore: 'I won\'t go to the party ',
    sentenceAfter: ' I am invited.',
    options: ['unless', 'if', 'because', 'since'],
    correctAnswer: 'unless',
    difficulty: '初级',
    category: '状语从句',
    explanation: {
      correctAnswer: 'unless',
      rule: 'unless 意为“除非”，引导否定条件状语从句，相当于 if...not。',
      example: 'You will fail the exam unless you work hard.',
      commonMistake: '误用 if。if 表示“如果”，语意逻辑不通。',
      reviewLink: 'https://baike.baidu.com/item/unless'
    }
  },
  {
    id: '4',
    sentenceBefore: 'The teacher suggested that we ',
    sentenceAfter: ' more time on English.',
    options: ['spend', 'spent', 'spending', 'to spend'],
    correctAnswer: 'spend',
    difficulty: '高级',
    category: '虚拟语气',
    explanation: {
      correctAnswer: 'spend',
      rule: 'suggest (建议) 引导的宾语从句中，谓语动词用 "should + 动词原形"，should 可省略。',
      example: 'He insisted that we (should) be on time.',
      commonMistake: '误用 spent。受主句过去时影响容易错选过去时，但此处是虚拟语气。',
      reviewLink: 'https://baike.baidu.com/item/虚拟语气'
    }
  },
  {
    id: '5',
    sentenceBefore: 'The news ',
    sentenceAfter: ' our team won the game excited us all.',
    options: ['that', 'which', 'what', 'whether'],
    correctAnswer: 'that',
    difficulty: '中级',
    category: '同位语从句',
    explanation: {
      correctAnswer: 'that',
      rule: 'that 引导同位语从句，解释说明 news 的具体内容，that 在从句中不作成分。',
      example: 'The fact that he is honest is well known.',
      commonMistake: '误用 which。which 引导定语从句时在从句中充当成分，而同位语从句中 that 不充当成分。',
      reviewLink: 'https://baike.baidu.com/item/同位语从句'
    }
  }
];
