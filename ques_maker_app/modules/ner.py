import spacy
import random

nlp = spacy.load('en_core_web_sm')

dates = ['none of the options', '1999', '1847']
person = ['none of the options', 'Jimmy', 'Kenny', "Lisbon"]
orgs = ['none of the options', 'Harvard', 'UCLA', "Google"]
ordinal = ['first', 'second', 'fourth', 'none of the options']
time = ['none of the options', '12:00', '11:00', '10:00']
product = ['none of the options']
language = ['none of the options', 'English', 'Spanish', 'French']
quantity = ['none of the options', '4', '2', '10']


class NER():
    def __init__(self, text):
        self.text = text
        self.sentence_range_list = []

    def get_sentence_no(self, l, r):
        for i in range(len(self.sentence_range_list)):
            l1, r1 = self.sentence_range_list[i]
            if l >= l1 and r < r1:
                return i

        return -1

    def addElm(self, options, cat):
        if cat == 'DATE':
            idx = random.randint(0, len(dates)-1)
            if dates[idx] not in options:
                return dates[idx]
            else:
                return -1
        elif cat == 'PERSON':
            idx = random.randint(0, len(person)-1)
            if person[idx] not in options:
                return person[idx]
            else:
                return -1
        elif cat == 'ORG':
            idx = random.randint(0, len(orgs)-1)
            if orgs[idx] not in options:
                return orgs[idx]
            else:
                return -1
        elif cat == 'PRODUCT':
            idx = random.randint(0, len(product)-1)
            if product[idx] not in options:
                return product[idx]
            else:
                return -1
        elif cat == 'LANGUAGE':
            idx = random.randint(0, len(language)-1)
            if language[idx] not in options:
                return language[idx]
            else:
                return -1
        elif cat == 'TIME':
            idx = random.randint(0, len(time)-1)
            if time[idx] not in options:
                return time[idx]
            else:
                return -1
        elif cat == 'QUANTITY':
            idx = random.randint(0, len(quantity)-1)
            if quantity[idx] not in options:
                return quantity[idx]
            else:
                return -1

    def get_mcq_questions(self):
        doc = nlp(self.text)
        sentence = list(doc.sents)

        for i in range(len(sentence)):
            if i == 0:
                self.sentence_range_list = [(0, len(str(sentence[0])))]
            else:
                self.sentence_range_list.append(
                    (self.sentence_range_list[i-1][1], self.sentence_range_list[i-1][1]+1 + len(str(sentence[i]))))

        ents = [(e.text, e.start_char, e.end_char, e.label_) for e in doc.ents]
        questions = []
        answers = []

        for i in range(len(ents)):
            ents_elm = ents[i]
            sent_no = self.get_sentence_no(ents_elm[1], ents_elm[2])

            if sent_no == -1:
                continue

            if ents_elm[3] == 'NORP' or ents_elm[3] == 'GPE' or ents_elm[3] == 'CARDINAL' or ents_elm[3] == 'LOC' or ents_elm[3] == 'PERCENT' or ents_elm[3] == 'MONEY' or ents_elm[3] == 'WORK_OF_ART':
                continue

            ques = str(sentence[sent_no])
            if ques.count('(') > 0 or ques.count(')') < 0:
                continue
            if ents_elm[3] == 'DATE':
                ques = ques.replace(ents_elm[0], 'which year/date')
            else:
                ques = ques.replace(ents_elm[0], "_______")
            if (ents_elm[3] == 'DATE' or '_____' in ques) and len(ques) > 60:
                questions.append((sent_no, ents_elm[3], ques))
                answers.append(ents_elm[0])

        for ent in ents:
            if ent[3] == 'DATE':
                dates.append(ent[0])
            elif ent[3] == 'PERSON':
                person.append(ent[0])
            elif ent[3] == 'ORG':
                orgs.append(ent[0])
            elif ent[3] == 'PRODUCT':
                product.append(ent[0])
            elif ent[3] == 'LANGUAGE':
                language.append(ent[0])
            elif ent[3] == 'TIME':
                time.append(ent[0])
            elif ent[3] == 'QUANTITY':
                quantity.append(ent[0])

        options = []
        for i in range(len(questions)):
            cat = questions[i][1]
            lst = []
            if cat == 'NORP' or cat == 'GPE' or cat == 'CARDINAL' or cat == 'LOC' or cat == 'PERCENT' or cat == 'MONEY' or cat == 'WORK_OF_ART':
                continue
            if cat == 'ORDINAL':
                options.append(ordinal)
                continue
            while len(lst) != 4:
                ans = self.addElm(lst, cat)
                if ans != -1:
                    lst.append(ans)

            options.append(lst)
            lst = []

        for i in range(len(answers)):
            if answers[i] not in options[i]:
                idx = random.randint(0, 3)
                options[i][idx] = answers[i]

        return questions, options, answers

    def getAnswerfield(self, option, answer):
        if answer not in option:
            return -1
        idx = option.index(answer)
        if idx == 0:
            return "option 1"
        elif idx == 1:
            return "option 2"
        elif idx == 2:
            return "option 3"
        return "option 4"

    def getQuestionIndex(self, questions, ques):
        for i in range(len(questions)):
            if questions[i]['question'] == ques:
                return i
        return -1

    def format_questions(self, questions, options, answers):
        final_questions = []
        myset = set()
        for i in range(len(questions)):
            _ques = {}
            sent_no = questions[i][0]
            cat = questions[i][1]
            ques = questions[i][2]
            ans = answers[i]

            if ans == -1:
                continue

            if sent_no in myset:
                idx = self.getQuestionIndex(final_questions, ques)
                if cat == 'DATE':
                    final_questions[idx] = {
                        "question": ques,
                        "options": options[i],
                        "answer": ans
                    }
                elif ques.find("_______") != -1:
                    final_questions[idx] = {
                        "question": ques,
                        "options": options[i],
                        "answer": ans
                    }
                continue

            myset.add(sent_no)
            _ques['question'] = ques
            _ques['options'] = options[i]
            _ques['answer'] = ans

            final_questions.append(_ques)

        return final_questions
